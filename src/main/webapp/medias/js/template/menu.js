// boot up the demo
var data = [{
    name: "1",
    comp: "pageComp",
    url: "iconFont.html",
    icon: "&#xe71d;",
    subMenus: [{name: "主页1-1",icon: "&#xe71d;", comp: "menucomp", url: "test.html"}, {name: "主页1-2", comp: "pageComp",icon:"&#xe71d;",url:"users.html"}, {
        name: "主页1-3",
        comp: "pageComp"
    }]
}, {name: "后台管理",icon:"&#xe758;",subMenus: [{name: "用户管理", icon:"&#xe73d;",comp: "menucomp", url: "users.html"}], comp: "menucomp"}, {
    name: "主页3",
    comp: "pageComp"
}];
var Vmenu = new Vue({
    el: '#index',
    data: {
        styleData: {
            isLeftMenuShow: true,
            isAnimate: false,
            leftMenuWidth:$(".leftMenu").width()
        },
        curData: {
            compMenu: data[0],
            curMenu: data[0]
        },
        menus: data
    },
    computed: {
        rightBodyStyle: function () {
            var width = this.$el.getElementsByClassName("top")[0].offsetWidth - this.styleData.leftMenuWidth;
            if (this.styleData.isAnimate) {
                this.styleData.isLeftMenuShow ? $(".rightBody").animate({
                    width: width
                }, 500) : $(".rightBody").animate({
                    width: width + this.styleData.leftMenuWidth
                }, 500);
            }
            else {
                return {
                    width: this.styleData.isLeftMenuShow ? width + "px" : width + this.styleData.leftMenuWidth + "px"
                }
            }
        }
        ,
        leftMenuStyle: function () {
            if (this.styleData.isAnimate) {
                this.styleData.isLeftMenuShow ? $(".leftMenu").animate({
                    marginLeft: 0
                }, 500) : $(".leftMenu").animate({
                    marginLeft: -this.styleData.leftMenuWidth
                }, 500);
            } else {
                return {
                    marginLeft: this.styleData.isLeftMenuShow ? 0 : -this.styleData.leftMenuWidth + "px"
                }
            }
        }
    }
    ,
    methods: {
        goTo: function (menu) {
            function getUrl(data, type) {
                if (data.url) {
                    return data
                } else if (data[type]) {
                    return getUrl((data[type])[0])
                }
                return data;
            }

            this.styleData.isAnimate = false;
            this.styleData.isLeftMenuShow = true;
            this.curData.compMenu = menu;
            this.curData.curMenu = getUrl(menu, "subMenus");
        }
    }
    ,
    components: {
        pageComp: {
            props: ['compMenu', 'pCurData', 'styleData'],
            template: '#template-page',
            methods: {
                updateP: function (menu, compMenu) {
                    // this.$emit("update:styleData", {
                    //     isLeftMenuShow: true,
                    //     isAnimate: false
                    // });
                    this.styleData.isLeftMenuShow = true;
                    this.styleData.isAnimate = false;
                    this.$emit("update:pCurData", {
                        compMenu: compMenu,
                        curMenu: menu
                    })
                }
            }
        }
    }
})
