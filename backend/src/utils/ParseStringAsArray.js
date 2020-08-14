module.exports = function ParseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); //separo os valores por virgula e depois com o trim removo os espaços
}