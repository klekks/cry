var alphabet = `АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ`;
var russian_stat = [["А", 7.998],
                    ["Б", 1.592],
                    ["В", 4.533],
                    ["Г", 1.687],
                    ["Д", 2.977],
                    ["Е", 8.483],
                    ["Ж", 0.94],
                    ["З", 1.641],
                    ["И", 7.367],
                    ["Й", 1.208],
                    ["К", 3.486],
                    ["Л", 4.343],
                    ["М", 3.203],
                    ["Н", 6.7],
                    ["О", 10.983],
                    ["П", 2.804],
                    ["Р", 4.746],
                    ["С", 5.473],
                    ["Т", 6.318],
                    ["У", 2.615],
                    ["Ф", 0.267],
                    ["Х", 0.9],
                    ["Ц", 0.4],
                    ["Ч", 1.45],
                    ["Ш", 0.718],
                    ["Щ", 0.3],
                    ["Ъ", 0.037],
                    ["Ы", 1.898],
                    ["Ь", 1.735],
                    ["Э", 0.331],
                    ["Ю", 0.638],
                    ["Я", 2.001]];
                    /*var russian_stat = [["А", 6.2],
                                        ["Б", 1.4],
                                        ["В", 3.8],
                                        ["Г", 1.3],
                                        ["Д", 2.5],
                                        ["Е", 7.2],
                                        ["Ж", 0.7],
                                        ["З", 1.6],
                                        ["И", 6.2],
                                        ["Й", 1.0],
                                        ["К", 2.8],
                                        ["Л", 3.5],
                                        ["М", 2.6],
                                        ["Н", 5.3],
                                        ["О", 9.0],
                                        ["П", 2.3],
                                        ["Р", 4.0],
                                        ["С", 4.5],
                                        ["Т", 5.3],
                                        ["У", 2.1],
                                        ["Ф", 0.2],
                                        ["Х", 0.9],
                                        ["Ц", 0.4],
                                        ["Ч", 1.2],
                                        ["Ш", 0.6],
                                        ["Щ", 0.3],
                                        ["Ъ", 0.1],
                                        ["Ы", 1.6],
                                        ["Ь", 1.3],
                                        ["Э", 0.3],
                                        ["Ю", 0.6],
                                        ["Я", 1.8]];*/
russian_stat.sort(function(a, b) {return a[1] - b[1];});
for (i in alphabet)
$("select").append(`<option>${alphabet[i]}</option>`);
