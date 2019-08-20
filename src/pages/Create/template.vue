<template>
  <div id="edit">
    <h2>创建文章</h2>
    <div class="return_button">
      <el-button icon="arrow-left" size="small" @click="goBack">返回</el-button>
    </div>
    <h4>文章标题</h4>
    <el-input v-model="title" placeholder="请输入标题" ></el-input>
    <p class="msg">限XXX个字</p>
    <div class="tag_wrap">
      <span class="tag_text">标签</span>
      <el-tag
        class="tag_margin"
        :key="tag"
        v-for="tag in labels"
        :closable="true"
        :close-trasition="true"
        @close="handleClose(tag)"
        type="primary"
      >{{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <h4>内容简介</h4>
    <el-input  v-model="description" placeholder="请输入简介"></el-input>
    <p class="msg">限XXX个字</p>
    <h4>文章内容 (Markdown编辑器)</h4>
    <el-input type="textarea" v-model="content"   :autosize="{ minRows: 8, maxRows: 40}"></el-input>
    <p class="msg">限XXX个字</p>
    <!--<p>-->
      <!--<label>是否展示到首页</label>-->
      <!--<el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->
    <!--</p>-->
    <el-button @click="onCreate">确定</el-button>
  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
