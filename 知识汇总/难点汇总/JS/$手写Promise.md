# 手写Promise

## Promise功能分析

1. Promise构造函数，必须传入执行函数executor，返回Promise对象

   1. executor在Promise创建时同步调用

   2. executor接收两个形参resolve与reject

      1. resolver调用，使得PromiseState转为fulfilled，PromiseResult值为形参值

      2. rejecter调用，使得PromiseState转为rejected，PromiseResult值为一个Error对象，错误信息为形参值

      3. executor执行过程的错误

         - 若此时状态为pending，则状态转rejected并结束executor；若此时状态为fulfilled，则仅结束executor
         - 若该Promise未使用实例方法来捕获error，则会直接throw error；
         - then的onrejected函数、catch的onrejected函数都可以捕获error；注意：finally无法捕获异常也不接收result

         

      

2. 对象具有两个隐藏属性（外部不可读写）

   1. PromiseState
      1. 可取值为：pending、fulfilled、rejected
      2. 状态只有由pending转为fulfilled或rejected，且不可逆
   2. PromiseResult

3. 实例方法then

   1. 接收至多两个形参onfulfilled函数（可选）与onrejected函数（可选），也可不传形参
      1. 当调用实例状态转为fulfilled时调用onfulfilled函数
      2. 当调用实例状态转为rejected时调用onrejected函数
      3. onfulfilled函数与onrejected函数的调用会放到微任务队列中
   2. 返回值为一个新的Promise实例
      1. 状态取决于形参函数调用返回值
         1. 若返回值为thenable对象，则会调用其then方法（功能等同于excutor）
      2. 若形参函数调用报错则于excutor报错流程类似
   3. 一个promise可以绑定多个处理函数（then、catch、finally）并在状态敲定时按绑定次序触发

   

4. 其它实例方法
   1. catch
   2. finally



- promise状态rejected后，串行的不含onrejected函数的promise会被转为rejected并将rejected result继续往后传递，直至串行末尾或onrejected
- 若catch拦截前有finally，则会在最后抛出错误
- finaly也会将error往后传
- promise绑定的处理函数会按照绑定顺序依次执行

- Promise静态方法未实现
- finally为宏任务？

## 代码实现

```js
const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

class MyPromise {
    // Promise状态
    #State = PENDING
    // result状态
    #result = undefined
    // 处理函数队列
    #queue = []

    constructor(executor) {
        // 若executor非函数则会抛出TypeError
        if (typeof executor !== 'function') throw TypeError(`MyPromise resolver ${executor} is not a function`)

        // executor错误拦截
        try {
            executor(this.#resolve.bind(this), this.#reject.bind(this))
        } catch (error) {
            this.#reject(error)
        }
    }

    // 将任务队列的任务用来创建微任务
    #executeQueue(type, result) {
        queueMicrotask(() => {
            this.#queue.forEach(v => {
                if (v.type === 'finally' || v.type === type) return v.fn(result)
            })
        })
    }

    // 对应executor接收的resolve函数
    #resolve(result) {
        if (this.#State !== PENDING) return
        this.#State = FULFILLED
        this.#result = result
        this.#executeQueue('fulfilled', result)
    }

    // 对应executor接收的reject函数
    #reject(error) {
        if (this.#State !== PENDING) return
        this.#State = REJECTED
        this.#result = error
        this.#executeQueue('rejected', new Error(error))

        // 若该Promise后续没有任何处理，抛出异常
        queueMicrotask(function () {
            if (!this.#queue.length) {
                throw new Error(error)
            }
        }.bind(this))
    }

    // then实例方法
    then(onfulfilled, onrejected) {

        const thenPromise = new MyPromise((res, rej) => {


            if (typeof onfulfilled === 'function') {
                this.#queue.push({
                        type: 'fulfilled',
                        fn: (promiseResult) => {

                            // 若调用Promise状态转rejected，则thenPromise状态转rejected
                            if (Object.prototype.toString.call(promiseResult) === '[object Error]') {
                                return thenPromise.#reject(promiseResult)
                            }

                            const result = onfulfilled(promiseResult)

                            // thenable处理？
                            if (result && typeof result.then === 'function') {
                                result.then(res, rej)
                            } else {
                                res(result)
                            }
                        }
                    }

                )
            }

            if (typeof onrejected === 'function') {
                this.#queue.push({
                    type: 'rejected',
                    fn: (error) => {
                        const result = onrejected(error)

                        // thenable处理？
                        if (result && typeof result.then === 'function') {
                            result.then(res, rej)
                        } else {
                            res(result)
                        }
                    }
                })
            }
        })

        return thenPromise
    }

    // catch实例方法
    catch (onrejected) {
        return this.then(undefined, onrejected)
    }

    // finally实例方法
    finally(onfinally) {
        const finallyPromise = new MyPromise((res, rej) => {})
        if (typeof onfinally === 'function') {

            this.#queue.push({
                type: 'finally',
                fn: (result) => {
                    onfinally()

                    setTimeout(() => {
                        // 若调用Promise状态转rejected，则finallyPromise状态转rejected
                        if (Object.prototype.toString.call(result) === '[object Error]') {

                            return finallyPromise.#reject(result)
                        }

                        // thenable处理？
                        if (result && typeof result.then === 'function') {
                            result.then(res, rej)
                        } else {
                            res(result)
                        }
                    })
                }
            })
        }
        return finallyPromise
    }
}
```

