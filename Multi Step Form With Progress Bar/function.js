var questions = [
    {question:"Your first name?"},
    {question:"Your last name?"},
    {question:"Your email ID?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Create a password", type: "password"}
]

;(function(){

    var tTime = 100
    var wTime = 200
    var eTime = 800

    var position = 0

    putQuestion()

    bttn.addEventListener('click', validate)
    txtfield.addEventListener('keyup', function(e){
        transform(0, 0)
        if(e.keyCode == 13) validate()
    })

    
    function putQuestion() {
        placeholder.innerHTML = questions[position].question
        txtfield.value = ''
        txtfield.type = questions[position].type || 'text'
        txtfield.focus()
        showCurrent()
    }


    function done() {
        form.className = 'close'

        var h1 = document.createElement('h1')
        h1.appendChild(document.createTextNode('Welcome ' + questions[0].value + '!'))
        setTimeout(function() {
            form.parentElement.appendChild(h1)
            setTimeout(function() {h1.style.opacity = 1}, 50)
        }, eTime)

    }

    function validate() {

        questions[position].value = txtfield.value

        if (!txtfield.value.match(questions[position].pattern || /.+/)) wrong()
        else ok(function() {

            progressb.style.width = ++position * 100 / questions.length + 'vw'

            if (questions[position]) hideCurrent(putQuestion)
            else hideCurrent(done)

        })

    }

    function hideCurrent(callback){
        container.style.opacity = 0
        bottomline.style.transition = 'none'
        bottomline.style.width = 0
        setTimeout(callback, wTime)
    }

    function showCurrent(callback) {
        container.style.opacity = 1
        bottomline.style.transition = ''
        bottomline.style.width = '100%'
        setTimeout(callback, wTime)
    }

    function transform(x, y) {
        form.style.transform = 'translate(' + x + 'px , ' + y + 'px)'
    }

    function ok(callback) {
        form.className = ''
        setTimeout(transform, tTime * 0, 0, 10)
        setTimeout(transform, tTime * 1, 0, 0)
        setTimeout(callback, tTime * 2)
    }
    
    function wrong(callback) {
        form.className ='wrong'
        for(var i = 0; i < 6; i++)
        setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
        setTimeout(transform, tTime * 6, 0, 0)
        setTimeout(callback, tTime * 7)
    }
    }())