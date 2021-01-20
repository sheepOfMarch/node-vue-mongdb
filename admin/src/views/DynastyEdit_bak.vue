<template>
  <div class="dynasty">
    <h1>{{ id ? "编辑" : "新建" }}朝代</h1>
    <el-form
      :model="model"
      :rules="rules"
      ref="model"
      :label-position="'left'"
      label-width="80px"
      width="300px"
      @submit.native.prevent="save('model')"
    >
      <el-form-item label="朝代名">
        <el-col :span="11">
          <el-form-item prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="2">级别:</el-col>
        <el-col :span="10">
          <el-form-item>
            <el-rate
              disabled
              show-score
              v-model="model.grade"
              style="margin: 0.6rem 10px"
            ></el-rate>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="国祚">
        <el-col :span="11">
          <el-form-item prop="durationBeginYear">
            <el-input
              placeholder="请输入年代(负数为公元前)"
              v-model="model.durationBeginYear"
            >
              <el-button
                type="text"
                slot="prepend"
                style="margin-left: -13px"
                @click.native="
                  model.durationBeginIsExact = !model.durationBeginIsExact
                "
                :class="model.durationBeginIsExact ? 'exact' : ''"
                >大约</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-form-item prop="durationEndYear">
            <el-input
              placeholder="请输入年代(负数为公元前)"
              v-model="model.durationEndYear"
            >
              <el-button
                type="text"
                slot="prepend"
                style="margin-left: -13px"
                @click.native="
                  model.durationEndIsExact = !model.durationEndIsExact
                "
                :class="model.durationEndIsExact ? 'exact' : ''"
                >大约</el-button
              >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="model.introduce"></el-input>
      </el-form-item>
      <el-form-item label="地图">
        <el-upload
          :action="$http.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="afterUpload"
          :file-list="model.maps"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="发布者">
        <el-input v-model="model.publisher" style="width: 148px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    const checkYear = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        var pattern = /(^-?[1-9]\d*$)|((公元|公元前)\d*年)/;
        var pattern1 = /(公元|公元前)\d*年/;
        if (!pattern.test(value)) {
          callback(new Error("请输入正确的年份"));
        } else {
          if (!pattern1.test(value)) {
            if (value < 0) {
              this.$set(this.model, rule.field, `公元前${Math.abs(value)}年`);
            } else {
              this.$set(this.model, rule.field, `公元${value}年`);
            }
          }
          callback();
        }
      }, 100);
    };
    return {
      model: {
        name: "",
        durationBeginIsExact: true,
        durationBeginYear: "",
        beginY: 0,
        durationEndIsExact: true,
        durationEndYear: "",
        endY: 0,
        maps: [],
        introduce: "",
        publisher: "",
        grade: 5,
      },
      rules: {
        durationBeginYear: [{ validator: checkYear, trigger: "blur" }],
        durationEndYear: [{ validator: checkYear, trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    yearIsRight() {
      const str1 = this.model.durationBeginYear;
      const str2 = this.model.durationEndYear;
      function year(str) {
        var num = parseInt(str.match(/\d+/g)[0]);
        if (str.match("前")) {
          num = 0 - num;
        }
        return num;
      }
      this.model.beginY = year(str1);
      this.model.endY = year(str2);
      return year(str2) >= year(str1);
    },
    async save(model) {
      if (!this.yearIsRight()) {
        this.$message({
          type: "error",
          message: "起止年份有误",
        });
        return;
      }
      this.$refs[model].validate(async (valid) => {
        if (valid) {
          if (this.id) {
            await this.$http.put(`rest/dynasties/${this.id}`, this.model);
          } else {
            await this.$http.post("rest/dynasties/", this.model);
          }

          this.$router.push("/dynasties/list");
          this.$message({
            type: "success",
            message: "保存成功",
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/dynasties/${this.id}`);
      this.model = res.data;
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.model.maps = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    afterUpload(res){
      this.model.maps.push(res)
    }
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style lang="less">
.dynasty {
  min-width: 700px !important;
}
.exact {
  span {
    color: #ccc;
    text-decoration: line-through;
  }
}
</style>
