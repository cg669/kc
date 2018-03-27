<template>
  <div class="no-auth-wrapper">
      <div class="no_shop_car_con">
          <div class="no-shop-car-item">
              <p>没有权限访问该页面</p>
              <p>
                  请,<a href="/" style="color:#1e81cd;">返回首页</a>
              </p>
          </div>
      </div>
  </div>
</template>
<script>
export default {

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .no-auth-wrapper{
      background-color: #fff;
      border: 1px solid #eee;
      padding-top:40px;
      .no_shop_car_con{
          border: 0;
          min-height: 460px;
          overflow: hidden;
          .no-shop-car-item{
              margin: 0 auto;
              width: 800px;
              height:285px;
              background: url('../../static/no-auth.png') no-repeat 217px 31px;
              background-size: 260px;
              p{
                  text-indent: 460px;
              }
              p:first-child{
                  padding-top: 214px;
                  font-size: 20px;
                  font-weight: 500;
                  color: #000;
              }
              p:last-child{
                  font-size: 16px;
                  font-weight: 500;
                  cursor: pointer;
              }
          }
      }
    }

    // .shop_card{
    //     background-color: #f4f5f7;
    //     // height: 100%;
    //     .box_sha_status{
    //         // width: calc(100% - 100px);
    //         width: 100%;
    //         height: 100%;;
    //         background:rgba(191,191,191,1);
    //         opacity:0.5;
    //         position: absolute;
    //         top: 0px;left: 0;
    //         z-index: 9999;
    //         .le_ff{
    //             width: 50px;
    //             height: 100%;
    //             background:rgba(191,191,191,1);
    //             // opacity:0.5;
    //             position: absolute;
    //             left:-50px;
    //         }
    //     }
    //     .xia_jia{
    //         position: absolute;
    //         top: 50%;
    //         left:10px;
    //         z-index: 99999;
    //         transform: translateY(-50%);
    //     }
    //     .shop_card_con{
    //         .title,.container{
    //             background-color: #fff;
    //         }
    //         .container{
    //             .head-dd{
    //                 th:first-child{
    //                     padding-left: 40px;
    //                 }
    //             }
    //             .ii{
    //                 padding-left: 50px;
    //             }
    //         }
    //     }
    //     .wrapper{
    //         background-color: #fff;
    //         .no_shop_car_con{
    //             border: 0;
    //             min-height: 460px;
    //             overflow: hidden;
    //         }
    //     }

    //     .title{
    //         position: relative;
    //         padding-left: 20px;
    //         // padding-top: 10px;
    //         line-height: 48px;
    //         height: 48px;
    //         border-bottom: 1px solid #ededed;
    //         .tit{
    //             padding-left:5px;
    //             border-left:4px solid #ef4c4f;
    //         }
    //         .back{
    //             position: absolute;
    //             top: 8px;
    //             right: 30px;
    //         }
    //     }
    //     .wrapper{
    //         border: 1px solid #eee;
    //     }
    //     .container{
    //         // padding: 20px;
    //         .el-table-column--selection{
    //             vertical-align: middle!important;
    //             .cell{
    //                 vertical-align: middle;
    //             }
    //         }
    //         .head-dd{
    //             height: 54px;
    //             line-height: 54px;
    //             background-color: #fafafa;
    //             th{
    //                 background-color: #fafafa;
    //             }
    //         }
    //         // .el-checkbox__original{
    //         //     position: relative;
    //         //     top: 10px;
    //         // }
    //         .el-checkbox__inner{
    //             // border: 1px solid #aaa;
    //             width: 20px;
    //             height: 20px;
    //             // padding: 5px;
    //         }
    //         .el-checkbox__inner::after{
    //             height: 10px;
    //             width: 5px;
    //             left: 6px;
    //             top: 2px;
    //         }
    //         .tab_cell{
    //             vertical-align: top;
    //             td{
    //                 padding: 30px 0;
    //                 vertical-align: top;
    //             }
    //         }
    //         .image{
    //             width: 146px;
    //             height: 92px;
    //             float: left;
    //             border-radius: 6px;
    //         }
    //         .old_price{
    //             font-size: 12px;
    //             color: #999;
    //             line-height: 12px;
    //             text-decoration: line-through;
    //         }
    //         .ii{
    //             // padding-left: 50px;
    //             cursor: pointer;
    //             position: relative;
    //             left: -10px;
    //         }
    //     }
    //     .pay{
    //         margin-top: 20px;
    //         background-color: #fff;
    //         overflow: hidden;
    //         position: relative;
    //         border: 1px solid #eee;
    //         // border-top: 1px solid #ededed;
    //         // line-height: 100px;
    //         min-height: 90px;
    //         .pay-box{
    //             position: absolute;
    //             right:40px;
    //             width: 600px;
    //             min-height: 70px;
    //             .total{
    //                 text-align: right;
    //                 color: #949191;
    //             }
    //             .money{
    //                 color: #000
    //             }
    //             .txt{
    //                 position: absolute;
    //                 left: 0px;top: 30px;
    //                 min-width: 400px;
    //                 text-align: right;
    //             }
    //             .btn{
    //                 position: absolute;
    //                 right: 10px;top: 20px;
    //                 width: 154px;height: 48px;
    //                 background-color: #ef4c4f;
    //             }
    //         }
    //     }
    //     .confirm-pay{
    //         min-height: 330px;
    //         .money-box{
    //             margin-top: 50px;
    //             font-size: 14px;
    //             .total{
    //                 color: #121212;
    //                 .tt{
    //                     padding-left: 20px;
    //                     // padding-bottom: 30px;
    //                     color: #f32121;
    //                     font-size: 24px;
    //                 }
    //             }
    //         }
    //     }
    // }
</style>