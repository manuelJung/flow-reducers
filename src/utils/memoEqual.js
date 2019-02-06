// @flow

export default function memoEqual(name:string, equalProps:string[], unequalProps:string[], instance?:any) {
  let i
  let checked = false
  return (prevProps:Object, nextProps:Object) => {
    if(instance){
      nextProps = prevProps
      prevProps = instance.props
    }
    if(process.env.NODE_ENV === 'development' && !checked){
      for(let key in nextProps){
        if(!equalProps.includes(key) || !unequalProps.includes(key)){
          console.warn(`${name} has an unregistered memo key "${key}"`)
        }
      }
      checked = true
    }
    for(i=0;i<equalProps.length;i++){
      const prop = equalProps[i]
      if(prevProps[prop] !== nextProps[prop]) return false
    }
    return true
  }
}