const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
}
const width = 450 - margin.right - margin.left;
const height = 450 - margin.top - margin.right;
// append the svg object to the body of the page
const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

// add X axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(myGroups)
    .padding(0.01);
svg.append('g')
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

// add Y axis
const y = d3.scaleBand()
    .range([height, 0])
    .domain(myVars)
    .padding(0.01);
svg.append('g')
    .call(d3.axisLeft(y));

// Build color scale
const myColor = d3.scaleLinear()
    .range(["white", "#69b3a2"])
    .domain([1, 100])

/*  {group: "A",
value: '30',
variable: 'V'
}
*/

// Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then(function (data) {

    const tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    const mouseover = function (event, d) {
        tooltip.style("opacity", 1)
    }
    const mousemove = function (event, d) {
        tooltip
            .html("The exact value of<br>this cell is: " + d.value)
            .style("left", (event.pageX) / 2 + "px")
            .style("top", (event.pageY) / 2 + "px")

    }
    const mouseleave = function (d) {
        tooltip.style("opacity", 0)
    }

    svg.selectAll()
        .data(data, function (d) {
            return d.group + ':' + d.variable;
        })
        .join("rect")
        .attr("x", function (d) {
            return x(d.group)
        })
        .attr("y", function (d) {
            return y(d.variable)
        })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
            return myColor(d.value)
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

})