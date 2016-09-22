# meeslider
Simple image/content slider as jQuery plugin 

## usage
**HTML**:
```html
<div id="myslider"><!-- Slider wrapper -->
    <ul>
        <li>Item 1</li><!-- Slide -->
        <li><img src="item2" /></li><!-- Slide -->
        <li><!-- Slide -->
            <h3>Some content header</h3>
            <p>Some content of this slide with text, images and others...</p>
        </li>
    </ul>
    <div class="prev"></div><!-- Prev button with your own styles -->
    <div class="next"></div><!-- Next button with your own styles -->
</div>
```

**JavaScript** (all options are optional):
```js
$('#myslider').meeSlider({
    controls: true,   // Show controls, default: true
    prev:     'prev', // Prev selector, default: 'prev'
    next:     'next', // Next selector, default: 'next'
    fadeIn:   200,    // fadeIn duration, default: 200
    fadeOut:  200,    // fadeOut duration, default: 200
});
```
