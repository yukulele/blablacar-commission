// ==UserScript==
// @name        Blablacar frais
// @namespace   https://github.com/yukulele/blablacar-commission
// @description affiche la commission blablacar sur la liste des trajets
// @include     https://www.blablacar.fr/trajet*
// @include     https://www.blablacar.fr/serch*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function(){
  
  var interval = setInterval(function(){
    if($('.price strong span, .Booking-price').length){
      clearInterval(interval)
      rplcfrais()
    }
  }, 1000)
  var frais = [
    [6, 1.00],
    [8, 1.50],
    [11, 2.00],
    [13, 2.50],
    [16, 3.00],
    [18, 3.50],
    [21, 4.00],
    [23, 4.50],
    [26, 5.00],
    [28, 5.50],
    [32, 6.00],
    [35, 6.50],
    [37, 7.00],
    [40, 7.50],
    [42, 8.00],
    [46, 8.50],
    [50, 9.00],
    [Infinity,18,'%']
  ]
  function rplcfrais(){
    $('.price strong span, .Booking-price').each(function(){
      var $this = $(this)
      var price = parseFloat($this.text().replace(/,/,'.'))
      for(var i in frais){
        var f = frais[i]
        if(price <= f[0])
          break
      }
      console.log(price, f,i)
      f = f.slice(0)
      if(f[2] === '%'){
        f[1] = price * f[1] / 100
      }
      f = f[1]
      var pct = Math.round (1000 / price * f) / 10
      f = Math.round((f) * 20) / 20
      var ttl = f + price
      // $this.html(ttl+"€<div style='font-size:0.5em'>"+price+'+'+f+'('+pct+'%)'+'</div>')
      $this.html(price+"€<div style='font-size:0.5em;font-weight:normal'>+"+f+'€ ('+pct+'%)'+' = <b>'+ttl+'€</b></div>')
    })
  }
})
