<template>
  <div class="dynasty">
    <div class="dynastyBox">
      <h1>{{ id ? "编辑" : "新建" }}朝代</h1>
      <!-- 表单开始 -->
      <el-form
        @submit.native.prevent="save"
        v-model="model"
        ref="model"
        label-width="60px"
      >
        <!-- 名称Begin -->
        <el-form-item label="名称:">
          <el-input
            v-model="model.dynastyName"
            @blur="regName(model.dynastyName)"
          ></el-input>
        </el-form-item>
        <!-- 名称End -->

        <!-- 建国时间Begin -->
        <el-form-item label="建国:" prop="establishYear">
          <el-row :gutter="0">
            <el-col :span="12">
              <div>
                <el-input
                  type="establishYear"
                  clearable
                  :disabled="model.establishIsKnown"
                  v-model="model.establishYear"
                  @blur="regYear(model.establishYear)"
                >
                  <el-button
                    slot="prepend"
                    @click.native.prevent="
                      model.establishIsKnown = !model.establishIsKnown
                    "
                  >
                    {{ model.establishIsKnown ? "不详" : "据载" }}</el-button
                  >

                  <el-button
                    slot="prepend"
                    @click.native.prevent="
                      model.establishIsBC = !model.establishIsBC
                    "
                  >
                    {{ model.establishIsBC ? "  公元" : "公元前" }}</el-button
                  >
                  <template slot="append">年</template>
                </el-input>
              </div>
            </el-col>
            <!-- 月份选择Begin -->
            <el-col :span="6">
              <div class="selectinfo">
                <el-select
                  :popper-append-to-body="false"
                  v-model="model.establishMonth"
                  :disabled="model.establishIsKnown"
                >
                  <el-option
                    v-for="item in monthOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <span class="wordSpan">月</span>
              </div>
            </el-col>
            <!-- 月份选择End -->

            <!-- 日期选择Begin -->
            <el-col :span="6">
              <div class="selectinfo">
                <el-select
                  :popper-append-to-body="false"
                  v-model="model.establishDay"
                  :disabled="model.establishIsKnown"
                  @focus="
                    setDays(model.establishYear, model.establishMonth, true)
                  "
                >
                  <el-option
                    v-for="(item, index) in establishDayOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <span class="wordSpan">日</span>
              </div>
            </el-col>
            <!-- 日期选择End -->
          </el-row>
        </el-form-item>
        <!-- 建国时间End -->

        <!-- 亡国时间Begin -->
        <el-form-item label="亡国:" prop="destroyedYear">
          <el-row :gutter="0">
            <el-col :span="12">
              <el-input
                type="destroyedYear"
                clearable
                :disabled="model.destroyedIsKnown"
                v-model="model.destroyedYear"
                @blur="regYear(model.destroyedYear)"
              >
                <el-button
                  slot="prepend"
                  @click.native.prevent="
                    model.destroyedIsKnown = !model.destroyedIsKnown
                  "
                >
                  {{ model.destroyedIsKnown ? "不详" : "据载" }}</el-button
                >

                <el-button
                  slot="prepend"
                  @click.native.prevent="
                    model.destroyedIsBC = !model.destroyedIsBC
                  "
                >
                  {{ model.destroyedIsBC ? "  公元" : "公元前" }}</el-button
                >
                <template slot="append">年</template>
              </el-input>
            </el-col>
            <!-- 月份选择Begin -->
            <el-col :span="6">
              <div class="selectinfo">
                <el-select
                  :popper-append-to-body="false"
                  v-model="model.destroyedMonth"
                  :disabled="model.destroyedIsKnown"
                >
                  <el-option
                    v-for="item in monthOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <span class="wordSpan">月</span>
              </div>
            </el-col>
            <!-- 月份选择End -->

            <!-- 日期选择Begin -->
            <el-col :span="6">
              <div class="selectinfo">
                <el-select
                  :popper-append-to-body="false"
                  v-model="model.destroyedDay"
                  :disabled="model.destroyedIsKnown"
                  @focus="
                    setDays(model.destroyedYear, model.destroyedMonth, false)
                  "
                >
                  <el-option
                    v-for="(item, index) in destroyedDayOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <span class="wordSpan">日</span>
              </div>
            </el-col>
            <!-- 日期选择End -->
          </el-row>
        </el-form-item>
        <!-- 亡国时间End -->

        <!-- 简介富文本Begin -->
        <el-form-item label="简介:">
          <vue-editor
            v-model="model.introduce"
            :editorToolbar="customToolbar"
          ></vue-editor>
        </el-form-item>
        <!-- 简介富文本End -->

        <!-- 图片上传Begin -->
        <el-form-item label="图片:">
          <el-upload
            class="upload-demo"
            :action="$http.defaults.baseURL + '/uploads'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="successUpload"
            :file-list="model.maps"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 图片上传End -->

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
  </div>
</template>

<script>
import {
  isNumber,
  getDayNumByYearMonth,
  formatYMD,
  delArrVal,
} from "../plugins/tools";
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        establishIsKnown: false,
        establishIsBC: true,
        destroyedIsKnown: false,
        destroyedIsBC: true,
        establishYear: "",
        destroyedYear: "",
        establishMonth: "",
        establishDay: "",
        destroyedMonth: "",
        destroyedDay: "",
      },
      monthOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      destroyedDayOptions: [],
      establishDayOptions: [],

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      fileList: [],
      // 富文本工具栏
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    };
  },
  methods: {
    async save() {
      const formatE = formatYMD(
        this.model.establishIsKnown,
        this.model.establishIsBC,
        this.model.establishYear,
        this.model.establishMonth,
        this.model.establishDay
      );
      const formatD = formatYMD(
        this.model.destroyedIsKnown,
        this.model.destroyedIsBC,
        this.model.destroyedYear,
        this.model.destroyedMonth,
        this.model.destroyedDay
      );
      this.model.establish = formatE;
      this.model.destroyed = formatD;
      if (this.id) {
        await this.$http.put(`rest/dynasties/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/dynasties", this.model);
      }
      this.$router.push("/dynasties/list");

      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    regName(name) {
      //判断名称是否为空
      if (!name) {
        this.$message({
          type: "error",
          message: "请输入名称",
        });
      }
    },
    regYear(year) {
      //判断年份是否正确
      if (!isNumber(year)) {
        this.$message({
          type: "error",
          message: "请输入正确的年份",
        });
        // this.model.establishYear = "";
      }
    },
    setDays(year, month, establishOrDestroyed) {
      year = parseInt(year);
      month = parseInt(month);
      if (year && month) {
        const days = getDayNumByYearMonth(year, month);
        // console.log(days + 'asdfsdfsdfsdf')
        if (establishOrDestroyed) {
          this.establishDayOptions = [];
          for (let index = 1; index <= days; index++) {
            this.establishDayOptions.push(index);
          }
        } else {
          this.destroyedDayOptions = [];
          for (let index = 1; index <= days; index++) {
            this.destroyedDayOptions.push(index);
          }
        }
      }
    },
    handleRemove(file) {
      delArrVal(this.model.maps, file._id, "_id");
      console.log(file)
      this.$http.post(`/uploads/delete`, file);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(file);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    successUpload(res) {
      const fileName = res.originalname;
      const fileUrl = res.url;
      const fileMaps = { name: fileName, url: fileUrl };
      this.model.maps.push(fileMaps);
    },
    async fetch() {
      const res = await this.$http.get(`rest/dynasties/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
    // this.regDay()
  },
};
</script>

<style lang="less">
.dynastyBox {
  // background-color: orange;
  width: 800px;
  height: 800px;
  margin: auto;
  box-shadow: 5px 5px 5px rgb(191, 182, 182);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  padding: 0 50px 0 30px;
}

.selectinfo {
  .el-input__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  }
}
.wordSpan {
  background-color: #f5f7fa;
  color: #909399;
  border: 1px solid #dcdfe6;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  padding: 9px 19px 9px 18px;
  font-size: 14px;
}
</style>
