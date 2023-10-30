/**
 * @description 转义html中左右箭头
 */
export function transformHtml(str) {
    if(!str) return '';
    return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,'');
}