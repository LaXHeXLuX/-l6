(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = "EL"

            if (h > 12) {
                h -= 12
                ampm = "PL"
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        function propername(value) {
            const allowed = "QWERTYUIOPÜÕASDFGHJKLÖÄZXCVBNMqwertyuiopüõasdfghjklöäzxcvbnm "
            for (let element in String(value)) {
                if (!(allowed.includes(value[element]))) {
                    return false
                }
            }
            return true
        }
        
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;  
        } 
        else if (!document.getElementById("v3").checked && !document.getElementById("v4").checked && !document.getElementById("v5").checked) {
            alert("Palun valige eelistatav tarneaeg");
            return;
        }
        else if (propername(document.getElementById("fname").value) == false) {
            alert("Palun sisestage eesnimi. Eesnimes ei tohi olla numbreid ega sümboleid")
            return
        } 
        else if (propername(document.getElementById("lname").value) == false) {
            alert("Palun sisestage perekonnanimi. Perekonnanimes ei tohi olla numbreid ega sümboleid")
            return
        } 
        else {
            
            let hind = 0
            if (document.getElementById("v1").checked) {hind += 5}
            if (document.getElementById("v2").checked) {hind += 1}
            if (linn.value == "trt") {hind += 2.5}
            else if (linn.value == "nrv") {hind += 2.5}
            else if (linn.value == "prn") {hind += 3}
            if (document.getElementById("v3").checked) {hind += 5}
            else if (document.getElementById("v4").checked) {hind += 3}

            e.innerHTML = hind + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";


let map;

function GetMap() {
    
    "use strict";

    let UT = new Microsoft.Maps.Location(
        58.38104, 
        26.71992    
        );
    let NRG = new Microsoft.Maps.Location(
        58.279810, 
        26.535378
        );
    const mainx = (58.38104 + 58.279810)/2;
    const mainy = (26.71992 + 26.535378)/2;
    let centerPoint = new Microsoft.Maps.Location(
            mainx, 
            mainy
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 11,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(UT, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    let pushpin2 = new Microsoft.Maps.Pushpin(NRG, {
            title: 'Nõo Reaalgümnaasium',
            //subTitle: 'Kah hea koht',
            //text: 'NRG'
        });

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
    const infobox1 = new Microsoft.Maps.Infobox(UT, {
        title: "Tartu Ülikool",
        description: "Siin käies saan mina ka nii targaks kui teie praegu"
    })
    const infobox2 = new Microsoft.Maps.Infobox(NRG, {
        title: "Nõo Reaalgümnaasium",
        description: "Siin käies saate teie ka nii targaks kui mina praegu"
    })

    function pushpinclick(i) {
        console.log("CLICKED!!!")
        if (i == "NRG") {
            infobox2.setMap(map);
        }
        else {
            infobox1.setMap(map);
        }
    }

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinclick("UT"));
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinclick("NRG"));
}

//https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=AuQWu31B5SnAELmqlDQpPFx4qitm_2AvrLxH4bDcdTzpNtAs2B1_KKQ0KWtspYX7

