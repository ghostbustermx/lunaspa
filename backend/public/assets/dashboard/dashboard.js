(function () {
    'use strict';

    function setupToggle(button) {
        var input = document.getElementById(button.getAttribute('data-pass-toggle'));
        if (!input) return;

        var labelShow = button.getAttribute('data-label-show') || 'Mostrar contrasena';
        var labelHide = button.getAttribute('data-label-hide') || 'Ocultar contrasena';

        button.addEventListener('click', function () {
            var visible = input.type === 'text';
            var start = input.selectionStart;
            var end = input.selectionEnd;

            input.type = visible ? 'password' : 'text';
            button.setAttribute('data-visible', visible ? 'false' : 'true');
            button.setAttribute('aria-pressed', visible ? 'false' : 'true');
            button.setAttribute('aria-label', visible ? labelShow : labelHide);
            button.setAttribute('title', visible ? labelShow : labelHide);

            try {
                input.setSelectionRange(start, end);
                input.focus();
            } catch (e) {}
        });
    }

    function init() {
        var buttons = document.querySelectorAll('[data-pass-toggle]');
        for (var i = 0; i < buttons.length; i++) setupToggle(buttons[i]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
