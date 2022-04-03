$(document).ready(function () {
    $('.vote-up').submit(function (e) {
        e.preventDefault();

        const postId = $(this).data('id');
        $.ajax({
            type: 'PUT',
            url: 'posts/' + postId + '/vote-up',
            success: function () {
                location.reload();
            },
            error: function (err) {
                if (err.status === 401)
                    return window.location.href = "/login";
                console.log(err);
            }
        });
    });

    $('.vote-down').submit(function (e) {
        e.preventDefault();

        const postId = $(this).data('id');
        $.ajax({
            type: 'PUT',
            url: 'posts/' + postId + '/vote-down',
            success: function () {
                location.reload();
            },
            error: function (err) {
                if (err.status === 401)
                    return window.location.href = "/login";
                console.log(err);
            }
        });
    });
});