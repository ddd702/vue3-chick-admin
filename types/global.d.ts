import 'pinia';

declare module '@vue/runtime-core' {
  //去除ts的报错，支持this.$message等操作
  interface ComponentCustomProperties {
    $message: any;
    $notify: any;
    $confirm: any;
  }
}
