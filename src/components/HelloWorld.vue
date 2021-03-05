<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="名称">
        <el-input v-model="form.name" v-on:keyup.13="onSubmit"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="currentpage">下一页</el-button>
      </el-form-item>
    </el-form>
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
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      urls: [],
      page: 1
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
    currentpage() {
      this.page++;
    },

    onSubmit() {
      //fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=%E8%AE%A1%E7%AE%97

      let form = {
        ...this.form
      };
      console.log(form);
      let translatename;
      this.axios
        .get(`/youdao/translate?&doctype=json&type=AUTO&i=${form.name}`)
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
