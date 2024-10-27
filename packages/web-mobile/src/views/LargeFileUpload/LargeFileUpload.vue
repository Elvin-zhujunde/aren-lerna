
<script>
import axios from '@/api/axios/axios.js'
import { reactive, toRefs, ref, watch } from 'vue'
import NavBar from '../../components/NavBar.vue';

export default {
  components: { NavBar },

  setup () {
    const state = reactive({
      fileList: [],
      chunks: [],
      activeFile: {},
      token: ''
    })
    const sendChunkCount = ref(0);
    const chunkCount = ref(0);
    watch(sendChunkCount, (newValue) => {
      if (newValue === chunkCount.value) { // 传完了,该发送合并请求
        let formD = new FormData()
        formD.append('type', 'merge')
        formD.append('token', state.token)
        formD.append('chunkCount', chunkCount.value)
        formD.append('filename', state.activeFile.file.name)
        uploadToServer(formD)
        sendChunkCount.value = 0;

      }
    })
    const submitUpload = async (file) => {
      // 切割文件
      let chunkSize = 2 * 1024 * 1024 // 2M
      // 打标记，时间戳
      state.token = (+new Date());
      // 拆文件
      if (file.size > chunkSize) {
        let start = 0,
          end = 0
        while (true) {
          end += chunkSize
          let blob = file.slice(start, end)
          start += chunkSize
          if (!blob.size) { // 截不到东西
            break;
          }
          state.chunks.push(blob) // 保存片段
        }
      } else {
        state.chunks.push(file.slice(0))
      }
      chunkCount.value = state.chunks.length
      for (let i = 0; i < chunkCount.value; i++) {
        let fd = new FormData()
        fd.append('token', state.token)
        fd.append('fileChunk', state.chunks[i])
        fd.append('index', i)
        uploadToServer(fd);
      }

    }
    const getUploadedFromStorage = () => {
      return JSON.parse(localStorage.getItem(saveChunkKey) || "{}");
    }
    //写入缓存
    const setUploadedToStorage = (index) => {
      let obj = getUploadedFromStorage();
      obj[index] = true;
      localStorage.setItem(saveChunkKey, JSON.stringify(obj));
    }

    const uploadToServer = (formData) => {
      axios.post('http://localhost:4000/upload', formData)
        .then(() => {
          sendChunkCount.value += 1
        }).catch(err => {
          console.log(err);
        })
    }
    const afterRead = async (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      state.activeFile = file;
      await submitUpload(file.file);
    };
    return {
      ...toRefs(state),
      afterRead
    }
  }
}
</script>
<template>
  <NavBar :title="`大文件上传`"></NavBar>

  <div class="large-file-uploader">
    <van-uploader
      :after-read="afterRead"
      v-model="fileList"
      :preview-image="false"
      accept="*"
    >
      <van-button icon="plus" type="primary">上传文件</van-button>
    </van-uploader>
  </div>
  <van-cell-group>
    <van-cell
      v-for="(item, index) in fileList"
      :key="index"
      :title="item.file.name"
      :value="Math.floor(item.file.size / 1024)"
    />
  </van-cell-group>
</template>

<style>
</style>