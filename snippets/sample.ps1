#Requires -Version 7.0
<#
.SYNOPSIS
    Sample script covering PowerShell language tokens.
.PARAMETER Name
    The name to greet.
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false, Position = 0)]
    [ValidateNotNullOrEmpty()]
    [string]$Name = 'World',

    [int]$Count = 3,

    [switch]$Loud
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ── Variables ──
$MaxRetries = 3
$pi = 3.14159
$hex = 0xFF
$enabled = $true
$nothing = $null
$escaped = "Tab:`t Quote:`" Newline:`n"
$literal = 'No $expansion here'
$expanded = "Hello, $Name! Count is $($Count * 2)."
$here = @"
Multi-line here-string
for $Name
"@
$numbers = @(5, 3, 8, 1, 9)
$scores = @{ Alice = 90; Bob = 75 }
$ordered = [ordered]@{ First = 1; Second = 2 }

# ── Enum and class ──
enum Color {
    Red
    Green
    Blue
}

class Animal {
    [string]$Name
    hidden [int]$Age
    static [int]$Count = 0

    Animal([string]$name, [int]$age) {
        $this.Name = $name
        $this.Age = $age
        [Animal]::Count++
    }

    [string] Speak() {
        throw [System.NotImplementedException]::new()
    }

    [string] ToString() {
        return "$($this.GetType().Name)($($this.Name), $($this.Age))"
    }
}

class Dog : Animal {
    [string]$Breed

    Dog([string]$name, [int]$age, [string]$breed) : base($name, $age) {
        $this.Breed = $breed
    }

    [string] Speak() {
        return "$($this.Name) says Woof!"
    }
}

# ── Functions ──
function Get-Sum {
    [OutputType([int])]
    param([int[]]$Values)

    $total = 0
    foreach ($v in $Values) {
        $total += $v
    }
    return $total
}

function Test-Age([int]$Age) {
    if ($Age -lt 0) {
        throw "Age must be positive: $Age"
    }
}

# ── Main ──
$dog = [Dog]::new('Rex', 3, 'Labrador')
Write-Host $dog.Speak() -ForegroundColor Cyan
Write-Output "$dog, total: $([Animal]::Count)"

# Operators
$arithmetic = (10 + 3) * 2 - 8 / 4 % 3
$comparison = ($Count -ge 1) -and ($Count -ne 2) -or -not $enabled
$match = 'john.doe@example.com' -match '^(?<user>[\w.]+)@'
$replaced = 'foo bar' -replace 'foo', 'baz'
$joined = $numbers -join ', '
$typeCheck = $dog -is [Animal]

# Loops and pipeline
for ($i = 0; $i -lt $numbers.Count; $i++) {
    if ($numbers[$i] -eq 3) { continue }
    if ($numbers[$i] -gt 8) { break }
}
foreach ($key in $scores.Keys) {
    "{0}: {1}" -f $key, $scores[$key]
}
$counter = 0
while ($counter -lt $Count) { $counter++ }
do { $counter-- } until ($counter -le 0)

$numbers | Where-Object { $_ -gt 2 } | ForEach-Object { $_ * 2 } | Sort-Object -Descending
Get-ChildItem -Path . -Filter *.ps1 -Recurse -ErrorAction SilentlyContinue | Select-Object -First 5 Name, Length

switch ([Color]::Blue) {
    ([Color]::Red) { 'Red' }
    { $_ -in [Color]::Green, [Color]::Blue } { 'Green or Blue' }
    default { 'Unknown' }
}

# Errors
try {
    Test-Age -Age -1
}
catch [System.Management.Automation.RuntimeException] {
    Write-Warning "Error: $($_.Exception.Message)"
}
finally {
    Write-Verbose 'Done'
}

Get-Sum -Values $numbers
$result = if ($Loud) { $expanded.ToUpper() } else { $expanded }
Write-Output $result, $MaxRetries, $pi, $hex, $nothing, $escaped, $literal, $here, $ordered
Write-Output $arithmetic, $comparison, $match, $Matches.user, $replaced, $joined, $typeCheck, $env:PATH
