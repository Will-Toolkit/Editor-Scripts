  /* TEMPLATES START */
const templates = [
    [
        "Home header",
        `<div class="row home-header imgFill" style="background-image: linear-gradient(), url();">
  <div class="panel-inner">
    <div class="col-xs-12 vertpad">

    </div>
  </div>
</div>`
    ],
    [
        "Row + col-xs-12",
        `<div class="row">
  <div class="panel-inner">
    <div class="col-xs-12 vertpad">

    </div>
  </div>
</div>`
    ],
    [
        "col-sm-6's",
        `<div class="row">
  <div class="panel-inner equal-height">
    <div class="col-xs-12 col-sm-6 vertpad align-self">
      <h2></h2>
      <p></p>
    </div>
    <div class="col-xs-12 col-sm-6 vertpad">
      <img class="lazy objectFill" style="width: 100%;" data-src="">
    </div>
  </div>
</div>`
    ],
    [
        "Btn",
        `<a class="btn primary" href="#">
Lorem
</a>`
    ],
    [
        "Img",
        `<img src=" " style="width: 100%;">`
    ],
    [
        "½ panel left",
        `<div class="row">
  <div class="panel-inner equal-height">
    <div class="col-xs-12 col-sm-6 vertpad sm-middle">
      <div class="half-panel-left">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div class="col-xs-12 col-sm-6 nopad">
      <img class="lazy objectFill" style="width: 100%;" data-src="">
    </div>
  </div>
</div>`
    ],
    [
        "½ panel right",
        `<div class="row">
  <div class="panel-inner equal-height">
    <div class="col-xs-12 col-sm-6 col-sm-push-6 vertpad sm-middle">
      <div class="half-panel-left">
        <h2></h2>
        <p></p>
      </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-sm-pull-6 nopad">
      <img class="lazy objectFill" style="width: 100%;" data-src="">
    </div>
  </div>
</div>`
    ],
    [
        "Expanding Container",
        `<div class="expand-container">
  <div class="expand-btn xs-middle">
    <h4>
      Question
    </h4>
    <i aria-hidden="true" class="fa-solid fa-chevron-down">
    </i>
  </div>
  <div class="minimize xs-middle">
    <h4>
      Question
    </h4>
    <i aria-hidden="true" class="fa-solid fa-chevron-up">
    </i>
  </div>
  <div class="expand-content">
    <p>
      Lorem Ipsum Dolor Sit Amet
    </p>
  </div>
</div>`
    ],
    [
        "Page anchor",
        `<div class="pageanchor" id=""></div>`
    ],
    [
        "Scroller",
        `<tw_scroller sid="XXXX" name="SCROLLERNAME"></tw_scroller>`
    ],
    [
        "Form",
        `<iframe title="Form title" class="resizeMe" onload="setIframesize()" src="...form url/plain" width="100%" frameborder="0" scrolling="no"></iframe>`
    ],
    [
        "Widget",
        `<tw_widget wid="XXX"></tw_widget>`
    ],
    [
        "Table",
        `<div style="overflow-x: auto;">
  <table>
    <thead>
      <tr>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>`
    ],
  [
    "Inline Fancybox",
    `<a data-fancybox data-src="#example" data-options='{"touch" : false}' href="javascript:;">
  Fancybox Button
</a>
<div class="html-popup" id="example"> 
  <h2>Hello</h2>
  <p>Lorem Ipsum</p>
</div>
`
  ],
  [
    "Fancybox Form popup",
    `
<a class="form-popup" data-fancybox="" data-type="iframe" href="javascript:;" data-src="form url /plain">
  Text Here
</a>`
  ]



];
  /* TEMPLATES END */
