$(document).ready(function () {
    $('.delete-btn').click(function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        $.ajax( {
            method: "DELETE",
            url: url
        }).done(function (data) {
            console.log(data);
            window.location = '/' + url.split('/')[1];
        }).fail(function (err) {
            console.log(err);
        });
    });

    $('#edit-tag').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: $(this).attr('action'),
            method:'PUT',
            data: $(this).serialize()
        }).done(function (res) {
            console.log(res);
        }).fail(function (err){
            console.log(err);
        });
    });
});
