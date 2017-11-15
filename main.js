var operateApp = new Vue({
  el: "#operate-app",
  data:{
    test:0,
    location:0,
    locations: [
      {
        name: "世界",
        style: {
            active: true
        }
      },
      {
        name: "城镇",
        style: {
            active: false
        }
      }
    ],
    town: [
      {
        name: "市场",
        cover: "./images/city1.jpg",
        content: "用于玩家交易",
        active: false
      },
      {
        name: "挑战区",
        cover: "./images/city2.jpg",
        content: "通往下一层的必经之路",
        active: false
      },
      {
        name: "狩猎场",
        cover: "./images/city3.jpg",
        content: "用于练习升级",
        active: false
      },
      {
        name: "学校",
        cover: "./images/city4.jpg",
        content: "获取攻略情报与技能",
        active: false
      }
    ],
    subtown: -1,
    fileButtonName: "Choose",
    ans_file: false
  },
  methods:{
    gotoLocation:function(i){
      this.locations[this.location].style.active = false;
      this.locations[i].style.active = true;
      this.location = i;
    },
    gotoSubtown:function(i){
      console.log("goto subtown:",i);
      console.log(this.town[i].active);
      this.town[i].active = true;
      this.subtown = i;
    },
    leaveSubtown:function(){
      if(this.subtown == -1){
        console.log("subtown == -1, you are not at any part of the town.")
        return;
      }
      // console.log(this.subtown)
      this.town[this.subtown].active = false;
      this.subtown = -1;
    },
    fileHandler:function(){
      console.log("submit button is clicked.");
      // ans_file refers to the status whether the user choose a file
      if(this.ans_file == true){
        // this.fileButtonName = "Submit";
        this.$refs.submitFile.click();
        this.ans_file = false;
        this.fileButtonName = "Choose";
        //应当判断用户是否真正选取了文件
      }
      else{
        // this.fileButtonName = "Choose";
        this.$refs.chooseFile.click();
        this.ans_file = true;
        this.fileButtonName = "Submit";
      }
    }
  },
  computed:{
    townOverview:function(){
      var ans = false;
      for(var i=0; i<this.town.length; i++){
        ans |= this.town[i].active;
      }
      return !ans;
    }
  }
});
var infoApp = new Vue({
  el: "#info-app",
  data:{
    user:{
      exp:72,
      image:"https://avatars3.githubusercontent.com/u/22167673?s=460&v=4",
      name:"Chen Hao",
      money:258,
      solved:72
    }
  }
});
