(function($) {

    $(document).ready( function() {

        // Convert all textarea with .editor class to WYSIWYG
        $('.editor').summernote({
            height: 200
        });


        // Init tooltips
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });


        // User productivity graph, used in sidebar
        $('.task-graph').sparkline('html', {
            type: 'bar',
            barColor: '#10a6de',
            lineWidth: 1,
            height: '20px',
        });

        // User productivity graph, used in sidebar
        $('.discuss-graph').sparkline('html', {
            type: 'bar',
            barColor: '#fbb05e',
            lineWidth: 1,
            height: '20px',
        });

        // User productivity graph, used in sidebar
        $('.contrib-graph').sparkline('html', {
            type: 'bar',
            barColor: '#56c32a',
            lineWidth: 1,
            height: '20px',
        });

        // re-styling select elements
        $('select').selectpicker({
            style: '',
            size: 4
        });

        // re-styling file elements
        $(':file').filestyle({
            icon: 'fa fa-folder-open',
            classButton: 'btn btn-default'
        });


        $(".bs-switch").bootstrapSwitch();
    });

})(jQuery);