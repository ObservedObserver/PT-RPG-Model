var operateApp = new Vue({
  el: "#operate-app",
  data:{
    test:0,
    location:0,
    levels: [],
    current_level:0,
    info_location:-1,
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
        active: 0
      },
      {
        name: "挑战区",
        cover: "./images/city2.jpg",
        content: "通往下一层的必经之路",
        active: 0
      },
      {
        name: "狩猎场",
        cover: "./images/city3.jpg",
        content: "用于练习升级",
        active: 0
      },
      {
        name: "学校",
        cover: "./images/city4.jpg",
        content: "获取攻略情报与技能",
        active: 0
      }
    ],
    achieve_town: [
      {
        name: "市场",
        cover: "./images/city1.jpg",
        content: "用于玩家交易",
        active: 1,
      },
      {
        name: "挑战区",
        cover: "./images/city2.jpg",
        content: "通往下一层的必经之路",
        active: 0
      },
      {
        name: "狩猎场",
        cover: "./images/city3.jpg",
        content: "用于练习升级",
        active: 0
      },
      {
        name: "学校",
        cover: "./images/city4.jpg",
        content: "获取攻略情报与技能",
        active: 0
      }
    ],
    current_achieve_town:0,
    subtown: -1,
    fileButtonName: "Choose",
    ans_file: false,
    problem: {
      content:"no data"
    },
    lessons:[],
    current_lesson:{},
    achievements:[]
  },
  methods:{
    gotoLevel:function(i){
      this.current_level = i;
    },
    gotoLocation:function(i){
      this.locations[this.location].style.active = false;
      this.locations[i].style.active = true;
      this.location = i;
      this.info_location = -1;
      infoApp.info_location = -1;
    },
    gotoSubtown:function(i){
      var self = this;
      var gotoChallenge = function(){
        $.ajax({
          url:"./server/problem/boss1.md",
          // dataType:"json",
          method:"get",
          success:function(res){
            console.log("get the problem:",res);
            var converter = new showdown.Converter(),
            text = res,
            html = converter.makeHtml(text);
            self.problem.content = html;
            // self.porblem = res;
          }
        })
      };
      var gotoSchool = function(){
        $.ajax({
          url:"./server/problem/video.json",
          method:"get",
          dataType:"json",
          success:function(res){
            self.lessons = res;
          }
        });
      }
      console.log("goto subtown:",i);
      console.log(this.town[i].active);
      this.town[i].active = true;
      if(i == 1){
        console.log("gotoChallenge()");
        gotoChallenge();
      }else if(i == 3){
        gotoSchool();
      }
      this.subtown = i;
    },
    leaveSubtown:function(){
      if(this.subtown == -1){
        console.log("subtown == -1, you are not at any part of the town.")
        return;
      }
      // console.log(this.subtown)
      this.town[this.subtown].active = 0;
      this.subtown = -1;
    },
    gotoLesson:function(i){
      console.log("gotoLesson(i).");
      this.current_lesson = this.lessons[i];
      this.town[this.subtown].active = 2;
    },
    gotoAchievetown:function(i){

      this.achieve_town[this.current_achieve_town].active = 0;
      this.achieve_town[i].active = 1;
      this.current_achieve_town = i;
    },
    leaveLesson:function(){
      this.current_lesson = {};
      this.town[this.subtown].active = 1;
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
    },
    locationShow:function(l){
      console.log("loc",l);
      var ans = this.locations[l].style.active;
      console.log("locationShow",ans);
      ans &= (this.info_location == -1);
      return ans;
    }
  },
  computed:{
    townOverview:function(){
      var ans = false;
      for(var i=0; i<this.town.length; i++){
        ans |= this.town[i].active;
      }
      return !ans;
    },

  },
  mounted:function(){
    var self = this;
    console.log("begin ajax");
    $.ajax({
      url:"./server/problem/levels.json",
      method:"get",
      dataType:"json",
      success:function(res){
        console.log(res);
        self.levels = res;
      }
    })
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
    },
    info_location:0,
    info_locations:[
      {
        name: "成就",
        style: {
            active: true
        }
      },
      {
        name: "装备",
        style: {
            active: false
        }
      },
      {
        name: "公会",
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
        active: 0
      },
      {
        name: "挑战区",
        cover: "./images/city2.jpg",
        content: "通往下一层的必经之路",
        active: 0
      },
      {
        name: "狩猎场",
        cover: "./images/city3.jpg",
        content: "用于练习升级",
        active: 0
      },
      {
        name: "学校",
        cover: "./images/city4.jpg",
        content: "获取攻略情报与技能",
        active: 0
      }
    ],
    current_town: 0,
  },
  methods:{
    gotoInfoLocation:function(i){
      this.info_location = i;
      operateApp.info_location = i;
      $.ajax({
        url:"./server/achievements.json",
        method:"get",
        dataType:"json",
        success:function(res){
          operateApp.achievements = res;
        }
      })
    }
  }
});
