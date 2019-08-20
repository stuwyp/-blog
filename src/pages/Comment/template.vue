<template>
  <section>
    <section class="comments-create">
      <h3 class="comments-title">评论区</h3>

      <el-form :model="ruleForm" status-icon :rules="rules" label-position="left" ref="ruleForm" label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" placeholder="请输入您的昵称" v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" placeholder="请输入您的邮箱（不会被公开）" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!--          <el-input type="textarea" placeholder="评论内容.." rows="4" v-model="ruleForm.content"-->
          <!--                    autocomplete="off"></el-input>-->
          <mavon-editor
            class="mavon-editor--box"
            v-model="ruleForm.content"
            :autofocus="false"
            placeholder="请输入评论内容"
            :ishljs="true">
          </mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交评论</el-button>
        </el-form-item>
      </el-form>
    </section>

    <!--<section class="comments-list" v-if="commentsList && commentsList.data.length > 0">-->
      <!--<h1 class="comments-title">评论列表</h1>-->
      <!--<ul class="comments-box">-->
        <!--<li v-for="(item, index) in commentsList.data"-->
            <!--class="comments-item"-->
            <!--:key="index">-->
          <!--<div class="comments-item-username">-->
            <!--<i class="icon el-icon-chat-dot-round"></i> 来自「{{item.nickname}}」的评论：-->
          <!--</div>-->
          <!--<div class="comments-item-content">-->
            <!--<mavon-editor-->
              <!--style="min-height: 0;width: 100%"-->
              <!--:ishljs="true"-->
              <!--v-model="item.content"-->
              <!--:defaultOpen="'preview'"-->
              <!--:editable="false"-->
              <!--:subfield="false"-->
              <!--:toolbarsFlag="false">-->
            <!--</mavon-editor>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<section class="page" v-if="commentsList && commentsList.meta">-->
        <!--<el-pagination-->
          <!--background-->
          <!--layout="prev, pager, next"-->
          <!--:page-count="commentsList.meta.count"-->
          <!--:current-page="commentsList.meta.current_page"-->
          <!--@current-change="changePage"-->
          <!--:total="commentsList.meta.total">-->
        <!--</el-pagination>-->
      <!--</section>-->
    <!--</section>-->
  </section>
</template>
<script src="./template.js"></script>

<style scoped src="./template.less" lang="less"></style>

