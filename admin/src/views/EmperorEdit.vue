<template>
  <div class="emperot" style="height: 550px">
    <h1>新建帝王</h1>
    <el-form :model="model" ref="model" label-width="80px" style="width: 844px">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-row>
            <!-- 姓名开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="姓名:">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
            <!-- 姓名结束------------------------- -->
            <!-- 别名开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="别名:">
                <el-input v-model="model.alias"></el-input>
              </el-form-item>
            </el-col>
            <!-- 别名结束------------------------- -->
          </el-row>

          <el-row>
            <!-- 字开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="字:">
                <el-input v-model="model.styleName"></el-input>
              </el-form-item>
            </el-col>
            <!-- 字结束------------------------- -->
            <!-- 号开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="号:">
                <el-input v-model="model.pseudonym"></el-input>
              </el-form-item>
            </el-col>
            <!-- 号结束------------------------- -->
          </el-row>
          <el-row>
            <!-- 出生地开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="出生地:">
                <el-input v-model="model.birthplace"></el-input>
              </el-form-item>
            </el-col>
            <!-- 出生地结束------------------------- -->
            <!-- 现今地址开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="(今):">
                <el-input v-model="model.birthplaceToday"></el-input>
              </el-form-item>
            </el-col>
            <!-- 现今地址结束------------------------- -->
          </el-row>

          <!-- 出生时间Begin -->
          <el-form-item label="出生:" prop="bornYear">
            <el-row :gutter="0">
              <el-col :span="12">
                <div>
                  <el-input
                    type="bornYear"
                    clearable
                    :disabled="model.bornIsKnown"
                    v-model="model.bornYear"
                    @blur="regYear(model.bornYear)"
                  >
                    <el-button
                      slot="prepend"
                      @click.native.prevent="
                        model.bornIsKnown = !model.bornIsKnown
                      "
                    >
                      {{ model.bornIsKnown ? "不详" : "据载" }}</el-button
                    >

                    <el-button
                      slot="prepend"
                      @click.native.prevent="model.bornIsBC = !model.bornIsBC"
                    >
                      {{ model.bornIsBC ? "  公元" : "公元前" }}</el-button
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
                    v-model="model.bornMonth"
                    :disabled="model.bornIsKnown"
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
                    v-model="model.bornDay"
                    :disabled="model.bornIsKnown"
                    @focus="setDays(model.bornYear, model.bornMonth, true)"
                  >
                    <el-option
                      v-for="(item, index) in bornDayOptions"
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
          <!-- 出生时间End -->

          <!-- 逝世时间Begin -->
          <el-form-item label="逝世:" prop="dieYear">
            <el-row :gutter="0">
              <el-col :span="12">
                <el-input
                  type="dieYear"
                  clearable
                  :disabled="model.dieIsKnown"
                  v-model="model.dieYear"
                  @blur="regYear(model.dieYear)"
                >
                  <el-button
                    slot="prepend"
                    @click.native.prevent="model.dieIsKnown = !model.dieIsKnown"
                  >
                    {{ model.dieIsKnown ? "不详" : "据载" }}</el-button
                  >

                  <el-button
                    slot="prepend"
                    @click.native.prevent="model.dieIsBC = !model.dieIsBC"
                  >
                    {{ model.dieIsBC ? "  公元" : "公元前" }}</el-button
                  >
                  <template slot="append">年</template>
                </el-input>
              </el-col>
              <!-- 月份选择Begin -->
              <el-col :span="6">
                <div class="selectinfo">
                  <el-select
                    :popper-append-to-body="false"
                    v-model="model.dieMonth"
                    :disabled="model.dieIsKnown"
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
                    v-model="model.dieDay"
                    :disabled="model.dieIsKnown"
                    @focus="setDays(model.dieYear, model.dieMonth, false)"
                  >
                    <el-option
                      v-for="(item, index) in dieDayOptions"
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
          <!-- 逝世时间End -->
          <el-row>
            <!-- 庙号开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="庙号:">
                <el-input v-model="model.templeName"></el-input>
              </el-form-item>
            </el-col>
            <!-- 庙号结束------------------------- -->
            <!-- 年号开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="年号:">
                <el-input v-model="model.yearNumber"></el-input>
              </el-form-item>
            </el-col>
            <!-- 年号结束------------------------- -->
            <el-row>
            <!-- 谥号开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="谥号:">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
            <!-- 谥号结束------------------------- -->
            <!-- 陵寝开始------------------------- -->
            <el-col :span="12">
              <el-form-item label="陵寝:">
                <el-input v-model="model.alias"></el-input>
              </el-form-item>
            </el-col>
            <!-- 陵寝结束------------------------- -->
          </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="主要事件"></el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button style="margin-top: 20px">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        bornIsKnown: false,
        bornIsBC: true,
        dieIsKnown: false,
        dieIsBC: true,
        bornYear: "",
        dieYear: "",
        bornMonth: "",
        bornDay: "",
        dieMonth: "",
        dieDay: "",
      },
      monthOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dieDayOptions: [],
      bornDayOptions: [],
    };
  },
};
</script>

<style lang="less">
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-form1 {
  background-color: #fff;
  width: 860px;
  height: 600px;
  border-radius: 10px;
}
</style>
