export function buildHtmlTable(csvDataset: string[][]) {
    // Nothing to do if we provide a null or string parameter
    if ((csvDataset == null) || (typeof(csvDataset) == "string")) {
        return "";
    }

    // Allow adjusting the column width
    const colCount = 1 + csvDataset[0].length;

    // The HTML for the table
    let tableHTML = '<table class="response-table">';


    // Now add the data rows
    //    <tr>
    //          <td> Value 1 </td>
    //          <td> Value 2 </td>
    //          <td> Value 3 </td>
    //    </tr>
    csvDataset.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(value => {
            tableHTML += '<td style = "width: ' + (100/colCount) + '%" >' + value +'</td>';
        });
        tableHTML += '</tr>';
    });

    tableHTML += "</table><br>";

    return tableHTML;
  }