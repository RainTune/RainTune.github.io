<script setup lang="ts">
import { UploadDragger } from 'ant-design-vue/lib/upload'
import { InboxOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/lib/upload/style'
import Spin from 'ant-design-vue/lib/spin'
import 'ant-design-vue/lib/spin/style'
import { createWorker } from 'tesseract.js'
import { ref, watch } from 'vue'
import { usePaste } from '@/hooks/usePaste'
const { pasteUrl } = usePaste()
const txt = ref('')
const imgUrl = ref('')
const loading = ref(false)
// const fileRef: any = ref(null)
const Img2Word = async (url: string) => {
  const worker = await createWorker(['eng', 'chi_sim'])
  loading.value = true
  try {
    const ret = await worker.recognize(url)
    loading.value = false
    console.log("before：",ret.data.text)
    // txt.value = ret.data.text;
    txt.value = ret.data.text.replace(/ +/g, '')
    console.log("after：", txt.value)
    await worker.terminate()
  } catch (err) {
    console.log("err:", err)
    loading.value = false
  }
}
// const fileChange = (e) => {
//   const file = e.target.files[0]
//   const reader = new FileReader()

//   reader.onload = function (e: any) {
//     imgUrl.value = e.target.result // 将图片文件转换为URL并显示在页面上
//   }
//   reader.readAsDataURL(file) // 以DataURL格式读取文件内容
//   e.target.value = null
// }
const beforeUpload = (file: File) => {
  debugger
  const reader = new FileReader()

  reader.onload = function (e: any) {
    debugger
    imgUrl.value = e.target.result // 将图片文件转换为URL并显示在页面上
  }
  reader.readAsDataURL(file) // 以DataURL格式读取文件内容
  return false
}
watch(imgUrl, function (val) {
  val && Img2Word(val)
})
watch(pasteUrl, function (val) {
  imgUrl.value = val
})
</script>

<template>
  <main>
    <!-- <div><input type="file" accept="image/*" @change="fileChange" /></div> -->
    <section class="content">
      <div class="img-container">
        <UploadDragger accept="image/*" :file-list="[]" :beforeUpload="beforeUpload">
          <div class="img-content">
            <span class="img" v-if="imgUrl"><img :src="imgUrl" /></span>
            <div class="tip">
              <InboxOutlined />
              <p>Click or drag or paste file to this area to upload</p >
            </div>
          </div>
        </UploadDragger>
        <!-- < img v-if="imgUrl" :src="imgUrl" />
        <span v-else>请先上传图片</span> -->
      </div>
      <Spin tip="解析中..." :spinning="loading">
        <div class="word-container">{{ txt || '暂无数据' }}</div>
      </Spin>
    </section>
  </main>
</template>
<style lang="css">
.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 100px;
  padding: 20px;
}
.img-container {
  background-color: #fafafa;
}
.ant-upload{
  overflow: auto;
}
.ant-upload.ant-upload-drag .anticon {
  color: #40a9ff;
  font-size: 48px;
}
.img-container,
.word-container {
  border: 1px solid cyan;
  height: calc(100vh - 100px);
  overflow: auto;
}
.word-container{
  white-space: pre-wrap;
}
.img-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tip {
  padding: 20px;
  text-align: center;
  height: 140px;
}
.img {
  flex: 1;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
