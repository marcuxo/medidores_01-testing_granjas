const FormatNumeral = (number) => {
  //console.log('||=>', number)
  if(number==="") return ""
  let numero = new Intl.NumberFormat('es-CL').format(number);
  //return numero.replace(/,/g,'.')
  return numero
};

const UnFormatNumeral = (number) => {
  let numstr = number+""
  let strwdp = numstr.split('.').join('')
  return strwdp
}
module.exports = {
  FormatNumeral,
  UnFormatNumeral
}