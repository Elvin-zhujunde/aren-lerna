const config = {
    population: {
        /**
         * detail: true, --详情时是否显示该字段
         * list: false, --列表时是否显示该字段
         * search: false --搜索是否显示该字段
         */
        fields: [
            { fieldDes: "姓名", field: "nameTm", detail: false, list: false, search: false },
            { fieldDes: "姓名", field: "name", detail: false, list: true, search: true },
            { fieldDes: "性别", field: "genderCn", detail: true, list: false, search: false },
            { fieldDes: "身份证号", field: "cardNoTm", detail: true, list: false, search: false },
            { fieldDes: "身份证号", field: "id_card", detail: false, list: true, search: true },
            { fieldDes: "重点人员类型", field: "label_name", detail: true, list: true, search: false },
        ],
        title: "nameTm",
    },
    place: {
        fields: [
            { fieldDes: "场所名称", field: "place_name", detail: true, list: true, search: false },
            { fieldDes: "场所标签", field: "category_name", detail: true, list: true, search: false },
            // { fieldDes: '场所负责人', field: 'place_user', detail: true, list: true, search: false },
            { fieldDes: "场所地址", field: "location", detail: true, list: true, search: false },
        ],
        title: "address",
    },
}

/**
 * 获取某个实体的fields
 * @param key
 * @param type: 'detail', 'list', 'search', 'title'
 * @returns {*}
 */
export function getFields(key, type) {
    let { fields } = config[key]
    if (type) {
        fields = fields.filter(item => item[type])
    }
    return fields.map(item => {
        let { detail, list, search, ...c } = { ...item }
        return c
    })
}

/**
 * 统一处理field对应值
 * @param key
 * @param obj
 * @returns {*}
 */
export function getFieldValue(key, obj, type) {
    return getFields(key, type).map(item => {
        switch (item.field) {
            case "isKeyPop":
                item.value = obj[item.field] === "1" ? "是" : "否"
                break
            case "keyPopType":
                const arr = []
                if (obj.keyPopEmancipistFlag == "1") arr.push("刑满释放人员")
                if (obj.keyPopCommunityCorrectionFlag == "1") arr.push("社区矫正人员")
                if (obj.keyPopPsychoticFlag == "1") arr.push("精神病患者")
                if (obj.keyPopDrugFlag == "1") arr.push("吸毒人员")
                if (obj.keyPopAidsFlag == "1") arr.push("艾滋病危险人员")
                if (obj.keyPopPetitionersFlag == "1") arr.push("重点上访人员")
                item.value = arr.join("，")
                break
            default:
                item.value = obj[item.field] || "-"
                break
        }
        return item
    })
}

/**
 * 获取标题key
 * @param key
 * @returns {*}
 */
export function getTitleKey(key) {
    return config[key].title
}
/**
 * 获取标题
 * @param key
 * @param obj
 * @returns {*}
 */
export function getTitle(key, obj) {
    return obj[config[key].title]
}

/**
 * 获取tags
 * @param key
 * @param obj
 * @returns {[]}
 */
export function getTags(key, obj) {
    let tags = []
    switch (key) {
        case "population":
            tags.push(obj.residentTypeCn)
            if (obj.isKeyPop === "1") tags.push("重点人口")
            break
        case "company":
            tags.push(obj.regStatusCn)
            break
        case "camera":
            tags.push(obj.statusCn)
            break
        default:
            break
    }
    return tags
}
