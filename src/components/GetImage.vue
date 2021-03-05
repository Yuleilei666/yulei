<template>
  <div class="box">
    <div>
      <el-input
        v-model="form.name"
        v-on:keyup.enter="onSubmit"
        style="width:300px;margin-right:20px"
      ></el-input>

      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="page++">下一页</el-button>
    </div>

    <div class="demo-image">
      <div class="block" v-for="url in urls" :key="url.id">
        <el-image class="item" :src="url.url_image" fit="contain"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
const Qs = require('qs');
export default {
  data() {
    return {
      form: {
        name: ''
      },

      urls: [],
      page: 1,
      url:
        'https://wall.alphacoders.com/api2.0/get.php?auth=1a1e07617b922b49f1f1efb53cf1326f&method=search&&width=1920&height=1080'
    };
  },
  created() {
    this.getNewImage();
  },
  watch: {
    page() {
      if (this.form.name == '') {
        this.getNewImage();
      } else {
        this.onSubmit();
      }
    }
  },

  methods: {
    onSubmit() {
      //fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=%E8%AE%A1%E7%AE%97

      let form = {
        ...this.form
      };
      console.log(form);
      let translatename;

      this.axios
        .post(
          `/youdao/translate_o/smartresult=dict&smartresult=rule`,
          Qs.stringify({
            i: form.name,
            from: 'zh-CHS',
            to: 'en',
            smartresult: 'dict',
            client: 'fanyideskweb',
            salt: '16149644890816',
            sign: 'f7a3040dc680160d4d528c7887884882',
            lts: '1614964489081',
            bv: '7b07590bbf1761eedb1ff6dbfac3c1f0',
            doctype: 'json',
            version: '2.1',
            keyfrom: 'fanyi.web',
            action: 'FY_BY_CLICKBUTTION'
          }),

          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(res => {
          translatename = res.data.translateResult[0][0].tgt;
        })
        .then(() => {
          let url = `https://wall.alphacoders.com/api2.0/get.php?auth=1a1e07617b922b49f1f1efb53cf1326f&method=search&term=${translatename}&width=1920&height=1080&page=${this.page}`;

          this.axios
            .get(url, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
              console.log(res);

              this.urls = res.data.wallpapers;
            });
        });
    },

    getNewImage() {
      let url = `https://wall.alphacoders.com/api2.0/get.php?auth=1a1e07617b922b49f1f1efb53cf1326f&method=highest_rated&page=10&info_level=2&page=${this.page}`;
      this.axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res);

          this.urls = res.data.wallpapers;
        });
    }
  }
};
</script>

<style scoped>
.demo-image {
  margin: 10px;
  column-count: 3;
  column-gap: 10px;
}
.item {
  margin-bottom: 10px;
}
.item img {
  width: 100%;
  height: 100%;
}
</style>
