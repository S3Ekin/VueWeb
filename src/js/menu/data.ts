export default {
  code: 100,
  msg: "成功",
  data: {
    code: "kpi",
    url: null,
    name: "root",
    remark: null,
    app_code: null,
    rank: null,
    sn: null,
    tag: null,
    icon: null,
    version: null,
    menuChildList: [
      {
        code: "kpi_01",
        url: null,
        name: "指标查询",
        remark: null,
        app_code: "kpi",
        rank: "0",
        sn: 1,
        tag: 0,
        icon: "fa-menu15",
        version: null,
        menuChildList: [
          {
            code: "kpi_0101",
            url: "user/user",
            name: "指标数据查询",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 1,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          }
        ]
      },
      {
        code: "kpi_02",
        url: null,
        name: "权重设置",
        remark: null,
        app_code: "kpi",
        rank: "0",
        sn: 2,
        tag: 0,
        icon: "fa-menu10",
        version: null,
        menuChildList: [
          {
            code: "kpi_0201",
            url: "user/role",
            name: "权重树设置",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 1,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0202",
            url: "weight/algorithm",
            name: "当前权重算法",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 2,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0203",
            url: "weight/config",
            name: "权重配置",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 3,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0204",
            url: "system/menu",
            name: "展示权重",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 4,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          }
        ]
      },
      {
        code: "kpi_04",
        url: null,
        name: "数据操作",
        remark: null,
        app_code: "kpi",
        rank: "0",
        sn: 3,
        tag: 0,
        icon: "fa-menu5",
        version: null,
        menuChildList: [
          {
            code: "kpi_0401",
            url: "data/criterion",
            name: "配置基准值",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 1,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: [
              {
                code: "kpi_040101",
                url: "save",
                name: "保存",
                remark: null,
                app_code: "kpi",
                rank: "2",
                sn: 1,
                tag: 0,
                icon: "fa-menu5",
                version: null,
                menuChildList: []
              }
            ]
          },
          {
            code: "kpi_0402",
            url: "data/fill",
            name: "数据填报",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 2,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: [
              {
                code: "kpi_040201",
                url: "edit",
                name: "编辑",
                remark: null,
                app_code: "kpi",
                rank: "2",
                sn: 1,
                tag: 0,
                icon: "fa-menu5",
                version: null,
                menuChildList: []
              }
            ]
          },
          {
            code: "kpi_0403",
            url: "admin",
            name: "公式计算",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 3,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          }
        ]
      },
      {
        code: "kpi_03",
        url: null,
        name: "院内考核",
        remark: null,
        app_code: "kpi",
        rank: "0",
        sn: 4,
        tag: 0,
        icon: "fa-menu1",
        version: null,
        menuChildList: [
          {
            code: "kpi_0304",
            url: "score/means",
            name: "当前评估算法",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 1,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: [
              {
                code: "kpi_030401",
                url: "save",
                name: "保存",
                remark: null,
                app_code: "kpi",
                rank: "2",
                sn: 1,
                tag: 0,
                icon: null,
                version: null,
                menuChildList: []
              }
            ]
          },
          {
            code: "kpi_0301",
            url: "score/evaluate",
            name: "科室评估",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 2,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0302",
            url: "score/rating",
            name: "等级分布",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 3,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: [
              {
                code: "kpi_030201",
                url: "dao",
                name: "导出",
                remark: null,
                app_code: "kpi",
                rank: "2",
                sn: 1,
                tag: 0,
                icon: "",
                version: null,
                menuChildList: []
              }
            ]
          },
          {
            code: "kpi_0303",
            url: "score/distribute",
            name: "优劣分布",
            remark: null,
            app_code: "kpi",
            rank: "1",
            sn: 4,
            tag: 0,
            icon: "",
            version: null,
            menuChildList: [
              {
                code: "kpi_030301",
                url: "dao",
                name: "导出",
                remark: null,
                app_code: "kpi",
                rank: "2",
                sn: 1,
                tag: 0,
                icon: "",
                version: null,
                menuChildList: []
              }
            ]
          },
          {
            code: "kpi_0306",
            url: "score/export",
            name: "数据导出",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 5,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0305",
            url: "score/report",
            name: "质控报告",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 6,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0307",
            url: "score/monitor",
            name: "实时监测",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 7,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0308",
            url: "score/analyse",
            name: "大数据分析",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 8,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          }
        ]
      },
      {
        code: "kpi_05",
        url: null,
        name: "院外考核",
        remark: "",
        app_code: "kpi",
        rank: "0",
        sn: 5,
        tag: 0,
        icon: "fa-menu1",
        version: null,
        menuChildList: [
          {
            code: "kpi_0501",
            url: "lobby/upload",
            name: "数据上报",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 1,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          },
          {
            code: "kpi_0502",
            url: "lobby/selfreport",
            name: "自评报告",
            remark: "",
            app_code: "kpi",
            rank: "1",
            sn: 2,
            tag: 0,
            icon: null,
            version: null,
            menuChildList: []
          }
        ]
      }
    ]
  }
}
