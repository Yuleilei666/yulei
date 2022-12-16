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
  mounted() {
    window.addEventListener('scroll', function() {
      console.log(document.documentElement.scrollTop); //代表目前滚动条和最上方的距离多长
      console.log(document.documentElement.scrollHeight); //代表整个滚动条多长
      console.log(document.documentElement.clientHeight);
      console.log(
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight
      );
    });
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
    async onSubmit() {
      //fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=%E8%AE%A1%E7%AE%97

      let form = {
        ...this.form
      };
      console.log(form);
      var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
      let name;
      if (reg.test(form.name)) {
        let translatename = await this.axios.get(
          `/youdao/translate?&doctype=json&type=AUTO&i=${form.name}`
        );
        name = translatename.data.translateResult[0][0].tgt;
      } else {
        name = form.name;
      }

      let url = `https://wall.alphacoders.com/api2.0/get.php?auth=1a1e07617b922b49f1f1efb53cf1326f&method=search&term=${name}&width=1920&height=1080&page=${this.page}`;

      let { data } = await this.axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      this.urls = data.wallpapers;
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
