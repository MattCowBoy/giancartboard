# GiancArtboard

## New in version 2
Compatible with Sketch 45.1
Now you can exclude artboards or pages from exporting by prefixing their name with “-”.


GiancArtboard is a Sketch plugin with 2 main features:

1. Quick exportation of artboards grouped in  folders ordered by pages and resolution (width). 
   This feature is useful if you are working on a responsive project or on a
   project with many pages and artboards.
2. Marking of all artboards with wrong width which was caused by a mistake (ex. 322px instead of 320px)

# Feature 1: Exporting artboards
## How does it work?

- Export artboards in pdf, jpg or png with a scale factor of 0.5x, 1x, 2x, 3x
- It renames them automatically with the following syntax:<br/> 
   [page number].[artboard number] - [page name] - [artboard name] (es: 1.2 - My profile - My order.png)
- Grouped exported artboards in ordered folders for two different path:
    - page/device/artboard.png
    - device/page/artboard.png

Artboards and pages will be numbered as they ordered in the layer list.
If you use Artboards Tricks from @rommanurik, artboards will be ordered in the layer list as they show up in canvas.
<a href="https://github.com/romannurik/Sketch-ArtboardTricks">Download Artboard Trick</a>


![GiancArtboard](https://github.com/MattCowBoy/giancartboard/blob/master/Screenshots/How%20it%20works%3F.png)

### Output

![GiancArtboard](https://github.com/MattCowBoy/giancartboard/blob/master/Screenshots/Output.png)


# Feature 2: Mark incorrect artboards
## How does it work?

- It asks for widths you are design for
- Every artboard with a different width will be marked

![GiancArtboard](https://github.com/MattCowBoy/giancartboard/blob/master/Screenshots/Check%20inaccurancy.png)

### Output

![GiancArtboard](https://github.com/MattCowBoy/giancartboard/blob/master/Screenshots/Check%20inaccurancy%20Copy.png)


### GiancArtboard is a plugin made by [Matteo Vacca](http://www.linkedin.com/in/matteovacca)  & [Marco Di Teodoro](http://www.linkedin.com/in/marcoditeodoro), from Rome with love!

I'd like to thank you all github community and Sketch Developers Community.</br>
Some functions in my code are based on code from others, especially:</br>

- <b><a href="https://github.com/romannurik">@romannurik</a></b>
- <b><a href="https://github.com/sonburn/symbol-organizer">@sonburn</a></b>
- <b><a href="https://github.com/rodi01/RenameIt">@rodi01</a></b>
- <b><a href="https://github.com/andrewfiorillo">@andrewfiorillo</a></b>
- <b><a href=" https://github.com/mathieudutour">@mathieudutour</a></b>


