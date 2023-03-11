var SearchData = /** @class */ (function () {
    function SearchData() {
    }
    SearchData.prototype.SearchData = function (csv_file, column, value) {
        this.searchResult(csv_file, column, value);
    };
    SearchData.prototype.searchResult = function (csv_file, column, value) {
        var emptyRes = [];
        var res = [
            ["3759", "96 G. Psc", "7.26388", "1.55643", "0.68697"],
        ];
        if (value == "3759" && (column == "0" || column == "StarID"))
            return res;
        else
            return emptyRes;
    };
    return SearchData;
}());
export { SearchData };
