<template>
  <section>
    <section class="comments-create">
      <h3 class="comments-title">评论区</h3>

      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" placeholder="请输入评论内容" :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="ruleForm.content"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交评论</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section class="comments-list" v-if="blogComments.list  && blogComments.list.length > 0">
      <h3 class="comments-title">评论列表</h3>
      <ul class="comments-box">
        <li v-for="(item, index) in blogComments.list"
            class="comments-item"
            :key="index">
          <div class="comments-item-username">
            <i class="icon el-icon-chat-dot-round"></i> 来自「 {{item.user.username}} 」的评论：
          </div>
          <div class="comments-item-content">
            {{item.content}}
          </div>
        </li>
      </ul>
      <section class="page" v-if="blogComments.list && blogComments.list.length">
        <el-pagination
          v-if="blogComments.pageCount>0"
          background
          layout="prev, pager, next"
          :page-count="blogComments.pageCount"
          :current-page="blogComments.page"
          @current-change="changePage"
          :total="blogComments.total">
        </el-pagination>
      </section>
    </section>
  </section>
</template>
<script src="./template.js"></script>

<style scoped src="./template.less" lang="less"></style>

