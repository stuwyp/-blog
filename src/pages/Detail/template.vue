<template>
  <div id="detail">
    <section class="user-info">
      <h3>{{title}}</h3>
      <span>
        发布于{{friendlyDate(createdAt)}}
      </span>
    </section>
    <section class="article" v-html="markdown"></section>
    <section>
        <v-comments>
        </v-comments>
    </section>
  </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
