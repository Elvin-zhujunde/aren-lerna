// 2024 / 12 / 02 / 星期一 14 : 46 : 46
<template>
  <div class="chat-container">
    <div class="chat-messages" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div :class="['message-content', message.role]">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage"
        placeholder="输入消息..."
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])
const userInput = ref('')

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userInput.value
  })
  
  const userMessage = userInput.value
  userInput.value = ''

  try {
    // 添加AI消息占位
    const aiMessageIndex = messages.value.length
    messages.value.push({
      role: 'assistant',
      content: ''
    })

    const response = await fetch('http://localhost:3000/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })

    const reader = response.body.getReader()
    let aiMessage = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      const text = new TextDecoder().decode(value)
      aiMessage += text
      messages.value[aiMessageIndex].content = aiMessage
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style scoped lang="less">
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.message {
  margin-bottom: 10px;
  
  .message-content {
    padding: 10px;
    border-radius: 8px;
    max-width: 70%;
    
    &.user {
      background: #007AFF;
      color: white;
      margin-left: auto;
    }
    
    &.assistant {
      background: white;
      color: #333;
    }
  }
}

.chat-input {
  display: flex;
  gap: 10px;
  
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
  }
  
  button {
    padding: 10px 20px;
    background: #007AFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #0056b3;
    }
  }
}
</style>
