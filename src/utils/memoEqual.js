// @flow

export default function memoEqual(name:string, equalProps:string[], unequalProps:string[]) {
  let i
  let checked = false
  return (prevProps:Object, nextProps:Object) => {
    if(process.env.NODE_ENV === 'development' && !checked){
      for(let key in nextProps){
        if(!equalProps.includes(key) || !unequalProps.includes(key)){
          console.warn(`${name} has an unregistered memo key "${key}"`)
        }
      }
      checked = true
    }
    for(i=0;i<equalProps.length;i++){
      if(prevProps[i] !== nextProps[i]) return false
    }
    return true
  }
}