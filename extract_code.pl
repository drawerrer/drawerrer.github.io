use strict;
use warnings;
use JSON::PP;
use Data::Dumper;

my $source_file = "/Users/youngju/Downloads/물 링 던지기/물 링 던지기 게임 코드";
my $output_file = "/Users/youngju/Downloads/물 링 던지기/index.html";

sub extract_code {
    open my $fh, '<', $source_file or die "Could not open '$source_file': $!";
    # Read entire file
    my $json_text = do { local $/; <$fh> };
    close $fh;

    my $data = decode_json($json_text);
    
    # Navigate: chunkedPrompt -> chunks
    my $chunks = $data->{chunkedPrompt}->{chunks};
    if (!$chunks && $data->{runSettings}) {
        # Maybe structure is different, check under runSettings if applicable (though previous view showed it at root)
        # But let's assume root based on previous view.
    }

    my $full_text = "";
    
    foreach my $chunk (@$chunks) {
        # Check role model
        if ($chunk->{role} && $chunk->{role} eq 'model') {
            if ($chunk->{parts}) {
                foreach my $part (@{$chunk->{parts}}) {
                    $full_text .= $part->{text} if $part->{text};
                }
            } elsif ($chunk->{text}) {
                $full_text .= $chunk->{text};
            }
        }
    }
    
    # Extract ```html ... ```
    if ($full_text =~ /```html(.*?)```/s) {
        my $html_content = $1;
        # Trim leading/trailing whitespace
        $html_content =~ s/^\s+|\s+$//g;
        
        open my $out, '>', $output_file or die "Could not open '$output_file': $!";
        print $out $html_content;
        close $out;
        print "Successfully extracted HTML to $output_file\n";
    } else {
        print "Could not find HTML code block in the extraction.\n";
        # Debug: print first 100 chars
        print "Start of text found: " . substr($full_text, 0, 100) . "\n";
    }
}

extract_code();
