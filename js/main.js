$(document).ready(function () {
    
    var ct = [];
    var pid = 100;
    
    
    
    function getSubCats (catid, pid, name) {
        var url = 'http://pcd.biker.hu/webservice/rest/object-list?order=ASC&objectClass=Kategoria&condition=o_parentId=' + catid + '&apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793'; 
        $.ajax({
            url: url,
            contentType: 'application/json',
            crossDomain: true,
            type: 'GET',
            jsonp: true
        }).done(function (data){
            // console.log(data.data[0].id);
            var dd = data.data;
            $.each(dd, function (i, v) {
                var ci = v.id;
                var nu = 'http://pcd.biker.hu/webservice/rest/object/id/' + ci + '?apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793';
                ct = []; 
                $.ajax({
                    url: nu,
                    contentType: 'application/json',
                    crossDomain: true,
                    type: 'GET',
                    jsonp: true
                }).done(function (sd) {
                    ct.push({id:sd.data.id, name: sd.data.elements[0].value, sort: sd.data.elements[2].value});
                    if (ct.length == dd.length) {
                        if (catid != 100) ct.push({id:pid, name: name, sort: -1});
                        var sct = _.sortBy(ct, 'sort');
                        $('div.list-group').html('');
                        $.each(sct, function (si, sv) {
                            $('div.list-group').append('<a class="list-group-item" href="/showcat/' + sv.id + '" data-tag="' + sv.id + '">' + sv.name + '</a>');
                        });
                        $('div.list-group > a').click(function (e) {
                            e.preventDefault();
//                            console.log($(this).attr('data-tag'));
                            getSubCats($(this).attr('data-tag'), pid, $(this).text());
                            
                        })
                        
                    } 
                });
                
                
            });
            
            
            
            
            
/***
 
                    <div class="col-sm-4 col-lg-4 col-md-4">
                        <div class="thumbnail">
                            <img src="http://placehold.it/320x150" alt="">
                            <div class="caption">
                                <h4><a href="#">First Product</a></h4>
                                <p>See more snippets like this online store item at <a target="_blank" href="http://www.bootsnipp.com">Bootsnipp - http://bootsnipp.com</a>.</p>
                            </div>
                        </div>
                    </div>
 
 
  
 */

            $('div#prds').html('');
            $('div.carousel-holder').hide();
            var url = 'http://pcd.biker.hu/webservice/rest/object-list?order=ASC&objectClass=Termek&condition=kategoriak%20LIKE%20%27%,'+ catid +',%%27&apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793'; 
            $.ajax({
                url: url,
                contentType: 'application/json',
                crossDomain: true,
                type: 'GET',
                jsonp: true
            }).done(function (dt){
                console.log('2', dt);
                var dd = dt.data;
                $.each(dd, function (pi, pv) {
                    console.log(pv.id);
                    var ci = pv.id;
                    var nu = 'http://pcd.biker.hu/webservice/rest/object/id/' + ci + '?apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793';
                    var ctp = []; 
                    $.ajax({
                        url: nu,
                        contentType: 'application/json',
                        crossDomain: true,
                        type: 'GET',
                        jsonp: true
                    }).done(function (sd) {
                        
                        // console.log(sd.data);
                        var ipe = sd.data.elements;
                        
                        var cki = _.findWhere(ipe, {name: 'cikkszam'}).value;
                        var ckt = _.findWhere(ipe, {name: 'Termekleiras'}).value;
                        var ckn = _.findWhere(ipe, {name: 'Nev'}).value;
                        var ckk = _.findWhere(ipe, {name: 'kepek'}).value;
                        if (ckk.length > 0) {
                            var tk = ckk[0].value;
                            tk = tk[0].value;
                            
                            var iu = 'http://pcd.biker.hu/webservice/rest/asset/id/' + tk + '?apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793';
                            $.ajax({
                                url: iu,
                                contentType: 'application/json',
                                crossDomain: true,
                                type: 'GET',
                                jsonp: true
                            }).done(function (md) {
                                //console.log(md);
                                var base64str = 'data:' + md.data.mimetype +';base64, ' + md.data.data;
                                var iid = md.data.id;
                                $('img#' + iid).attr('src', base64str);     
                                
                            });
                            
                            
                            
                            
                            
                            
                            ckk = '<img id="' + tk + '" src="http://placehold.it/320x150';
                        } else {
                            ckk = '<img src="http://placehold.it/320x150';
                        }
                        //console.log(cki, ckt, ckn, ckk);
                        
                        var htmlstr = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">' + ckk +'" alt=""><div class="caption">' +
                            '<h4><a href="#">' + ckn +'</a></h4>' +
                            '<h5>' + cki +'</h5>' +
                            '<p>' + ckt + '</p>'
                        
                        $('div#prds').append(htmlstr);
                        
/*
                        ct.push({id:sd.data.id, name: sd.data.elements[0].value, sort: sd.data.elements[2].value});
                        if (ct.length == dd.length) {
                            var sct = _.sortBy(ct, 'sort');
                            $('div.list-group').html('');
                            $.each(sct, function (si, sv) {
                                $('div.list-group').append('<a class="list-group-item" href="/showcat/' + sv.id + '" data-tag="' + sv.id + '">' + sv.name + '</a>');
                            });
                            $('div.list-group > a').click(function (e) {
                                e.preventDefault();
    //                            console.log($(this).attr('data-tag'));
//                                getSubCats($(this).attr('data-tag'), pid, $(this).text());
                                
                            })
                            
                        } 
                        */
                    });
                });
            });
            
            
        });
    }   
    
    
    //$('div.carousel-holder').hide();
     
    //var url = 'http://pcd.biker.hu/webservice/rest/object-list?order=ASC&offset=0&limit=60&objectClass=Kategoria&apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793';
    var url = 'http://pcd.biker.hu/webservice/rest/object-list?order=ASC&limit=20&objectClass=Kategoria&condition=o_parentId=' + pid + '&apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793';
        $.ajax({
            url: url,
            contentType: 'application/json',
            crossDomain: true,
            type: 'GET',
            jsonp: true
        }).done(function (data){
//            console.log(data.data[0].id);
            var dd = data.data;
            $.each(dd, function (i, v) {
                var ci = v.id;
                var nu = 'http://pcd.biker.hu/webservice/rest/object/id/' + ci + '?apikey=86ff97fe40a1417ee3f44c0c1c0d4bf5cdf1ae4d6d159ef5a73adad8a9305793'; 
                $.ajax({
                    url: nu,
                    contentType: 'application/json',
                    crossDomain: true,
                    type: 'GET',
                    jsonp: true
                }).done(function (sd) {
                    ct.push({id:sd.data.id, name: sd.data.elements[0].value, sort: sd.data.elements[2].value});
                    if (ct.length == dd.length) {
                        var sct = _.sortBy(ct, 'sort');
                        $.each(sct, function (si, sv) {
                            $('div.list-group').append('<a class="list-group-item" href="/showcat/' + sv.id + '" data-tag="' + sv.id + '">' + sv.name + '</a>');
                        });
                        $('div.list-group > a').click(function (e) {
                            e.preventDefault();
//                            console.log($(this).attr('data-tag'));
                            getSubCats($(this).attr('data-tag'), pid, $(this).text());
                            
                        })
                        
                    } 
                });
                
                
            });
            
            var id = data.data[0].id;
        });
});
