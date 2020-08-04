const express = require ('express')
const app = express ()

app.set ('view engine','pug')
app.use (express.static ('static'))

app.get ('/', (req, res) => res.render ('index',
                                        {
                                            raagaList : get_raagas ('raaga/')
                                        }))

app.get ('/raaga', (req, res) => res.render ('raagas',
                                             {
                                                 raagaList : get_raagas ('')
                                             }))

app.get ('/raaga/:raagaName', (req, res) => {
    res.render ('raaga',
                {
                    raagaName : req.params.raagaName,
                    videos : get_yt_iframes_for (get_video_ids_for (req.params.raagaName)),
                    raagaList : get_raagas ( '' )
                })
})

app.listen (8000, () => {
    console.log ('app listening at port 8000')
})

const raagaVideoIds = {
    yaman : [
        'q0TSLv2zj5I',
        'wHuqc3DO1Bo',
        'xG7EsVR73J4'
    ],
    kafi : [ ],
    bilawal : [ ],
    bhairav : [ ]
}

function get_raagas (baseurl)
{
    let raagas_code = Array ();
    Object.keys (raagaVideoIds).forEach ( (item) => {
        raagas_code.push ('<a href=\"' + baseurl + item + '\" class=\"btn btn--s btn--gray\">' + item + '</a>');
    })
    return raagas_code
}

function get_video_ids_for (raagaName)
{
    return raagaVideoIds[raagaName]
}

function get_yt_iframes_for (video_ids)
{
    let yt_iframes = Array ()
    video_ids.forEach ( (item) => {
        let iframe_code = '<iframe width=\"280\" height=\"157\" src=\"https://www.youtube.com/embed/' + item + '\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"></iframe>'
        let href_code = '<a href=\"https://www.youtube.com/watch?v=' + item + '\">Watch on YouTube</a>'
        yt_iframes.push (iframe_code + href_code)
    })
    return yt_iframes
}