import axiosInit from './http'; //把上面的暴露出来的axionInit进行引入，这样就可以使用我们上面定义的拦截器
 
//封装get函数
export const get = (url,data) => {
    return axiosInit({
        url:url,
        method:'GET',
        params:data,
    })
}
 
//封装put函数
export const put = (url,data) => {
    return axiosInit({
        url:url,
        method:'PUT',
        data:data,
    })
}
 
//封装post函数
export const post = (url,data) => {
    return axiosInit({
        url:url,
        method:'post',
        data:data,
    })
}
 
//括号里面的url和data都是调用的时候传进来的参数
//我上面只是封装了常用的get、post、put请求方法，其他你们也可以自行封装。我这里不是采用默认导出的，因为需要什么就进行按需导入。如果默认导出的话，还得导出名字.post，个人不是很喜欢这种使用方法。


/* import {post,get,put} from './api';
 
get('/api/home').then((rsp)=>{
    console.log(rsp);
}) */