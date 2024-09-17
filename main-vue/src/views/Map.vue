<template>
  <div class="map">
    <div ref="echart" class="echart"></div>
    <Button @click.stop="backTop" class="btn">返回上级地图</Button>
  </div>
</template>

<script>
import echarts from "echarts";
import AMap from "AMap";
import AMapUI from "AMapUI";
import { Button } from "element-ui";
export default {
  name: "Map",
  components: {
    Button
  },
  data() {
    return {
      myCharts: null, // 地图容器
      map: {}, // map对象
      parentJson: [],
      geoJsonData: {}, // 获取坐标数据
      mapData: [],
      parentCode: [100000], // 默认展示全国地图。
      testData: []
    };
  },
  methods: {
    //获取geoJson数据
    getGeoJson(adcode) {
      this.map = new AMap.Map("map", {
        resizeEnable: true,
        // center: [116.30946, 39.937629]
      });
      // console.log(this.map);
      let that = this;
      AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: this.map
        }));
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length > 0 && Json[0].properties.level == "district") {
            that.parentJson = Json;
          } else if (Json.length == 0) {
            Json = that.parentJson.filter(item => {
              if (item.properties.adcode == adcode) {
                return item;
              }
            });
          }
          that.geoJsonData = {
            features: Json
          };
          // console.log(that.geoJsonData);
          that.getMapData();
        });
      });
    },
    //获取数据
    getMapData() {
      this.mapData = this.geoJsonData.features.map(item => {
        let p = item.properties;
        let r = (Math.random() * 100) | 0;
        return {
          name: p.name,
          value: [...p.center, r],
          level: p.level,
          cityCode: p.adcode
        };
      });
      // console.log(this.geoJsonData.features);
      console.log(this.mapData);
      this.testData = this.mapData.slice(0, 10).map(item => {
        let obj = { ...item };
        obj.name = obj.name.substr(0, 1);
        return obj;
      });
      console.log(this.testData);
      //去渲染echarts
      this.initEcharts();
    },
    initEcharts() {
      this.myChart = echarts.init(this.$refs.echart);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
      echarts.registerMap("Map", this.geoJsonData); //注册
      this.myChart.setOption(
        {
          grid: {
            top: 200
          },
          tooltip: {
            trigger: "item",
            formatter: p => {
              let val = p.value;
              if (window.isNaN(val)) {
                val = 0;
              }
              let txtCon =
                p.name +
                "<br>" +
                "<hr>" +
                "数值 : " +
                val.toFixed(2);
              return txtCon;
            }
          },
          title: {
            show: true,
            x: "center",
            y: 20,
            text: "区域可点击,可缩放",
            textStyle: {
              color: "yellow",
              fontSize: 20,
              height: 50
            }
          },
          visualMap: {
            type: "piecewise",
            show: true,
            showLabel: true,
            min: 0,
            max: 100,
            right: 20,
            bottom: 20,
            // calculable: true,
            seriesIndex: [1],
            text: ["完成率(%)"],
            itemWidth: 5,
            itemHeight: 17,
            itemGap: 0,
            align: "left",
            backgroundColor: "#060A55",
            textGap: 8,
            padding: 15,
            textStyle: {
              color: "#FFF",
              fontSize: 12
            },
            pieces: [
              {
                gt: 100,
                label: ">100",
                color: "#2F22C7"
              },
              {
                gte: 80,
                lte: 100,
                label: "80-100",
                color: "#4A51EC"
              },
              {
                gt: 65,
                lte: 80,
                label: "65-80",
                color: "#6862F8"
              },
              {
                gt: 45,
                lte: 60,
                label: "45-65",
                color: "#8783FA"
              },
              {
                gt: 20,
                lte: 45,
                label: "20-45",
                color: "#9894FF"
              },
              {
                gte: 0,
                lte: 20,
                label: "0-20",
                color: "#99A0FC"
              }
            ]
          },
          //这里可以添加echarts内置的，例如下载图片等
          toolbox: {
            feature: {
              dataView: {
                show: false
              },
              magicType: {
                show: false
              },
              restore: {
                show: false
              },
              saveAsImage: {
                show: true,
                name: "地图",
                pixelRatio: 2
              }
            },
            iconStyle: {
              normal: {
                borderColor: "#41A7DE"
              }
            },
            itemSize: 15,
            top: 20,
            right: 22
          },
          geo: {
            show: true,
            map: "Map",
            // center: [116.30946, 39.937629],
            aspectScale: 0.75, //长宽比
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#f8f8f8"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "cyan"
                }
              }
            },
            roam: true,
            zoom: 1.2,
            itemStyle: {
              normal: {
                // areaColor: "#023677",
                borderColor: "#B5BBFC"
              },
              emphasis: {
                areaColor: "#060C55",
              }
            }
          },
          series: [
            {
              name: "散点",
              type: "scatter",
              coordinateSystem: "geo",
              data: this.mapData,
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: "white"
                }
              }
            },
            {
              name: "地图",
              type: "map",
              map: "Map", // 这里的Map和echarts.registerMap("Map", this.geoJsonData); 相对应
              roam: true, //是否可缩放
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              data: this.mapData,
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              animation: false,
            },
            {
              name: "增强散点",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: this.testData,
              symbolSize: 20,
              showEffectOn: "render",
              rippleEffect: {
                // brushType: "fill",
                brushType: "stroke",
                scale: 2.2
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: v => {
                    return v.name.substring(0, 1);
                  },
                  position: "inside",
                  color: "#fff",
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "purple",
                  shadowBlur: 5,
                  shadowColor: "white"
                }
              },
              zlevel: 1
            }
          ]
        },
        true
      );
      let that = this;
      this.myChart.off("click");
      this.myChart.on("click", params => {
        let cityCode = params.data.cityCode;
        that.parentCode.push(cityCode);
        that.getGeoJson(cityCode);
      });
    },
    //返回上一级
    backTop() {
      if (this.parentCode.length === 1) return;
      // //删除最后一位
      this.parentCode.pop();
      this.getGeoJson(this.parentCode[this.parentCode.length - 1]);
    }
  },
  mounted() {
    this.getGeoJson(100000);
  }
};
</script>
<style lang="scss" scoped>
.map{
  background: #0B1067;
}
.echart {
  width: 1000px;
  height: 100vh;
  position: relative;
  margin: auto;
}
.btn {
  position: fixed;
  left: 25%;
  top: 20px;
  z-index: 10;
}
</style>