const setSql = searchMsg => {
    let sql = []
    if (searchMsg.name != "selectall") {
        sql.push("AND KYDWW_SSDWMC like '%" + searchMsg.name + "%'");
    }
    if (searchMsg.level != "selectall") {
        sql.push("AND KYDWW_CN_NAME ='" + searchMsg.level + "'");
    }
    return sql.join(" ");
}

export default setSql