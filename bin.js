
        const h = ["Ft"];
        for(let i = 6; i < a.length-3; i++){
//            console.log("C: " + c);
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += /* + a[i] + ": " */ befilts[befous[c]]
            else text += "<td>" + a[i] + " " + h[i-6] + "</td>";
        }
