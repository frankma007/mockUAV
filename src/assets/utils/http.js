import axios from 'axios';//这个需要你自己去npm install axios进行安装
const axiosInit = axios.create({//创建一个axios实例
    baseURL:"",//基准URL，就是相同的那一部分
    time: 3000,//响应时间
})
//下面的是请求拦截
axiosInit.interceptors.request.use((config) => {
    // 请求成功，一般都需要在这里做一些配置，下面的是我自己加上token到请求头
    //如果本地缓存中存在后端发过来的token，就在请求头中添加token上去
    if (localStorage.getItem('token')) {//括号里面的token是你自己定义的，因为我在我的登录界面的时候，就把后端返回的token存在localStroage，同时命名为token，所以这里你们可以自己根据自己的项目进行修改。如果
        config.headers['token'] = localStorage.getItem('token');//添加上去请求头
    }
    return config;//通过，返回响应的拦截
}, (error) => {//出现错误
    return Promise.reject(error);//返回错误信息
}
)
 
//下面的是响应拦截
axiosInit.interceptors.response.use(
    (response) => {//如果后端返回成功，就执行{}里面的内容
        console.log(response);//打印一下后端返回的数据
        if(response.status == 200){//判断一下后端返回的数据中的状态码是不是200，如果是200，就执行下面的return
            return Promise.resolve(response);
        }else{//如果返回的状态码不是200，就返回错误的信息，同时也可以在这里定义其他的状态码，然后加上去
            return Promise.reject(response);
        }
    },
    (error) =>{//后端没有成功返回数据，就执行下面的return
        return Promise.reject(error);
    }
)
 
export default axiosInit;//把上面创建的实例暴露出去，方便等等我们在httpHelper.js文件进行引入