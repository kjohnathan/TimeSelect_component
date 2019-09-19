const flex = {
    "altText": "新的預約成立了", 
    "contents": { 
        "contents": [
            {   "body": 
                {   "contents": [
                    {   "color": "#40653E", 
                        "margin": "lg", 
                        "size": "md", 
                        "text": "Reservation", 
                        "type": "text", 
                        "weight": "bold"
                    }, 
                    {   "contents": [
                        {   "color": "#aaaaaa", 
                            "flex": 4, 
                            "size": "md", 
                            "text": "預約人姓名", "type": "text"}, {"color": "#666666", "flex": 6, "size": "md", "text": "{{reservation['name']}}", "type": "text", "wrap": true}], "layout": "baseline", "margin": "xxl", "spacing": "sm", "type": "box"}, {"contents": [{"color": "#aaaaaa", "flex": 4, "size": "md", "text": "預定時間", "type": "text"}, {"color": "#666666", "flex": 6, "size": "md", "text": "{{reservation['datetime']}}", "type": "text", "wrap": true}], "layout": "baseline", "margin": "lg", "spacing": "sm", "type": "box"}, {"contents": [{"contents": [{"color": "#aaaaaa", "flex": 4, "size": "sm", "text": "地點", "type": "text"}, {"color": "#666666", "flex": 6, "size": "sm", "text": "台北市中山區民生西路45巷5弄5號", "type": "text", "wrap": true}], "layout": "baseline", "spacing": "sm", "type": "box"}], "layout": "vertical", "margin": "lg", "spacing": "sm", "type": "box"}], "layout": "vertical", "type": "box"}, "direction": "ltr", "footer": {"contents": [{"size": "sm", "type": "spacer"}, {"action": {"data": "first_cancel_reservation-{{reservation['reservation_id']}}-{{reservation['datetime']}}", "label": "取消預約", "type": "postback"}, "color": "#8E9881", "height": "sm", "style": "primary", "type": "button"}, {"action": {"label": "聯絡客服", "type": "uri", "uri": "https://line.me/R/ti/p/%40zpp7402i"}, "color": "#DD8464", "height": "sm", "margin": "lg", "style": "primary", "type": "button"}], "layout": "horizontal", "type": "box"}, "type": "bubble"}], "type": "carousel"}, "type": "flex"
}

export default flex;