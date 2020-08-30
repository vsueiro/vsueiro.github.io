var app = {
    visual: {
        borders: {
            resize: function() {
                each('[data-device="notebook"]', function() {
                    var t = 8,
                        e = t / 1280 * this.offsetWidth;
                        console.log( this.offsetWidth )
                    e < 3 && (e = 3), this.style.borderRadius = e + "px"
                }), each('[data-device="phone"]', function() {
                    var t = 8,
                        e = t / 320 * this.offsetWidth;
                        console.log( this.offsetWidth )
                    e < 3 && (e = 3), this.style.borderRadius = e + "px"
                }), each('[data-frame="phone"]', function() {
                    var t = 24,
                        e = t / 320 * this.offsetWidth;
                        console.log( this.offsetWidth )
                    e < 3 && (e = 3), this.style.borderRadius = e + "px"
                })
            }
        },
        update: function() {
            // this.borders.resize()
        },
        initialize: function() {
            // this.borders.resize()
        }
    },
    environment: {
        touch: function() {
            touch() && (document.documentElement.dataset.touch = "true")
        },
        browser: function() {
            document.documentElement.dataset.browser = browser()
        },
        check: function() {
            this.touch(), this.browser()
        }
    },
    events: {
        resize: function() {
            window.addEventListener("resize", function() {
                app.visual.update()
            })
        },
        mouseout: function() {
            each(".portfolio li:not(.filler)", function() {
                this.addEventListener("mouseenter", function(t) {
                    this.style.zIndex = "2"
                }), this.addEventListener("mouseleave", function(t) {
                    var e = this;
                    setTimeout(function() {
                        e.style.zIndex = "1"
                    }, 100)
                })
            })
        },
        tap: function() {
            each("a", function() {
                this.addEventListener("touchstart", function() {
                    return !0
                })
            })
        },
        hash: function() {
            each('a[href^="#"]', function() {
                this.addEventListener("click", function(t) {
                    t.preventDefault();
                    var e = this.getAttribute("href");
                    return scrollIt(the(e), 400, "easeInOutQuad", function() {
                        console.log("Scrolled")
                    }), !1
                })
            }), window.addEventListener("hashchange", function() {}, !1)
        },
        initialize: function() {
            this.mouseout(), this.hash(), this.tap(), this.resize()
        }
    },
    initialize: function() {
        this.events.initialize(), this.environment.check(), this.visual.initialize()
    }
};
app.initialize();
