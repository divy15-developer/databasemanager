
const proxy_connection = 'http://192.168.0.58:3003/api'

export const Api_Endpoint_Constants = [
    {dashboard : {
        add_db_connection : `${proxy_connection}/user/dashboard/store/database/connection`,
        search_show_db_connection : `${proxy_connection}/user/dashboard/serach/show/db/list`,
        fetchDBAllData : `${proxy_connection}/user/dashboard/get/all/db/info`
    }}
]