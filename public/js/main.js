'use strict';

$(document).ready(init);

var auto;
var $container;
var timer;

function init() {
  $('input.autoupdate').on('update', autoupdate);
  $('div.button>input').on('click', update);
  $('div.input>textarea').on('update', update);
  $('div.input>textarea').on('paste', paste);
  $('div.input>textarea').on('keyup', keyup);
  $container = $('div.html-document');
  auto = true;
}

function autoupdate(event) {
  auto = event.target.checked;
}

function update() {
  sendData($('div.input>textarea').val());
}

function paste(event) {
  sendData(event.originalEvent.clipboardData.getData('Text'));
}

function keyup() {
  if (auto) {
    clearTimeout(timer);
    timer = setTimeout(update, 500);
  }
}

function sendData(text) {
  var data = {};
  data.string = text;
  $.ajax({
    method: 'POST',
    url: '/md-processor',
    data: data,
    success: changeHtml,
    error: showError
  });
}

function changeHtml(html, status) {
  $container.children().remove();
  $container.append($.parseHTML(html));
}

function showError(promise, status, error) {
  $container.children().remove();
  var $err = $('<p>').text('Failed to update document. Error status: ' + status);
  $container.append($err);
}
