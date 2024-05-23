document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('confirmation-message').style.display = 'block';

    document.getElementById('order-form').reset();
});