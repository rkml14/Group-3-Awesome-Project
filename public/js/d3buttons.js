const maps = [
  { name: 'Bind' },
  { name: 'Split' },
  { name: 'Haven' },
  { name: 'Ascent' },
  { name: 'Icebox' },
  { name: 'Breeze' },
  { name: 'Pearl' },
  { name: 'Fracture' },
  { name: 'Lotus' },
];

// Define the word cloud layout
const layout = d3.layout
  .cloud()
  .size([500, 500])
  .words(maps.map((map) => ({ text: map.name, size: 10 + Math.random() * 40 })))
  .padding(5)
  .rotate(() => (Math.random() > 0.5 ? 0 : 90))
  .fontSize((d) => d.size)
  .on('end', draw);

// Start the layout
layout.start();

// Define the draw function to render the word cloud
function draw(words) {
  d3.select('#word-cloud')
    .append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr(
      'transform',
      `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
    )
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', (d) => `${d.size}px`)
    .style('font-family', 'Helvetica Neue, Arial')
    .style('fill', 'black')
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
    .text((d) => d.text);
}
